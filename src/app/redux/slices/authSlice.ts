import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string| null;
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
// login
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (body, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/login', body);
    // expected response shape: { user, token }
    return data;
  } catch (err: any) {
    const msg = err?.response?.data?.message || 'Login failed';
    return rejectWithValue(msg);
  }
});

// 2) REGISTER
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/registerUser', async (body, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/register', body);
    return data;
  } catch (err: any) {
    const msg = err?.response?.data?.message || 'Registration failed';
    return rejectWithValue(msg);
  }
});

// 3) FETCH ME (when you already have a token)
export const fetchMe = createAsyncThunk<
  User,
  void,
  { rejectValue: string; state: { auth: AuthState } }
>('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/auth/me');
    return data.user as User;
  } catch (err: any) {
    const msg = err?.response?.data?.message || 'Failed to fetch profile';
    return rejectWithValue(msg);
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;