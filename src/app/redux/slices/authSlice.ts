/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../services/axios";
type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string| null;
  phone: string,
  address?:string
  website?: string

};

type AuthState = {
  user: User | null;
  token: string | null;
  status:'idle' | 'loading' | 'succeeded' | 'failed';
  error:string| null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error:null,
  isAuthenticated: false,
};

// ---------Thunks ----------------------

// login thunk
export const loginUser = createAsyncThunk<
  { user: User; token: string },                 // success payload
  { email: string; password: string },           // input arg
  { rejectValue: string }                        // error payload
>('auth/loginUser', async (body, { rejectWithValue }) => {
  try {
    // Call your backend: expects { user, token }
    const res = await axios.post('/auth/login', body);
    return res.data as { user: User; token: string };
  } catch (err: unknown) {
    // Turn any error into a friendly string for UI
    let msg = 'Login failed';
    if (typeof err === 'object' && err !== null) {
      const e = err as { response?: { data?: { message?: string } }; message?: string };
      msg = e?.response?.data?.message ?? e?.message ?? msg;
    }
    return rejectWithValue(msg);
  }
});

// register thunk
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { name: string; email: string; password: string, phone:number, website?:string },
  { rejectValue: string }
>('auth/registerUser', async (body, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/register', body);
    return data;   // 👈 must return { user, token } from backend
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? err?.message ?? 'Registration failed';
    return rejectWithValue(msg);
  }
});

// 3) FETCH ME (when you already have a token)
export const fetchMe = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      // no token → just skip (not an error)
      return rejectWithValue("No token");
    }

    const { data } = await axios.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.user as User;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message || err?.message || "Failed to fetch profile";
    return rejectWithValue(msg);
  }
});

//  update user thunk
// export const updateUserProfile = createAsyncThunk<
//   User,
//   Partial<User>,
//   { rejectValue: string; state: { auth: AuthState } }
// >("auth/updateUserProfile", async (updates, { getState, rejectWithValue }) => {
//   try {
//     const state = getState();
//     const id = state.auth.user?.id;
//     if (!id) throw new Error("Not logged in");

//     const res = await axios.put(`/users/${id}`, updates);
//     return res.data.user as User;
//   } catch (err: any) {
//     return rejectWithValue(err?.response?.data?.message || "Update failed");
//   }
// });
export const updateUserProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string; state: { auth: AuthState } }
>("auth/updateUserProfile", async (updates, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    if (!auth.user) throw new Error("Not logged in");

    const res = await axios.put(`/users/${auth.user.id}`, updates, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    return res.data.user as User;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message ?? err.message ?? "Update failed"
    );
    
  }
  
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.status = 'succeeded';
    },
    logout: (state) => {
   state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      localStorage.removeItem("token");
      localStorage.removeItem("auth-user");
      },

    registerUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.status = 'succeeded';
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

    .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("auth-user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; 
      // overwrite with new user
      if (typeof window !== "undefined") {
    localStorage.setItem("auth-user", JSON.stringify(action.payload));
  }
      })

      
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to fetch user';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to fetch user';
      })
     .addCase(fetchMe.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.payload as string;

  // only clear state if the token was invalid
  if (action.payload === "Unauthorized") {
    state.isAuthenticated = false;
    state.user = null;
    state.token = null;
  }
})
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;