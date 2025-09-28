// app/AuthPersist.tsx
"use client";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store/store";
// import { login, logout } from "@/app/redux/slices/authSlice";

// export default function AuthPersist() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user, token } = useSelector(
//     (state: RootState) => state.auth
//   );

//   // Load from storage on first render
//   useEffect(() => {
//     const storedUser = localStorage.getItem("auth-user");
//     const storedToken = localStorage.getItem("auth-token");

//     if (storedUser && storedToken) {
//       dispatch(login({ user: JSON.parse(storedUser), token: storedToken }));
//     }
//   }, [dispatch]);

//   // Save whenever auth state changes
//   useEffect(() => {
//     if (isAuthenticated && user && token) {
//       localStorage.setItem("auth-user", JSON.stringify(user));
//       localStorage.setItem("auth-token", token);
//     } else {
//       localStorage.removeItem("auth-user");
//       localStorage.removeItem("auth-token");
//     }
//   }, [isAuthenticated, user, token]);

//   return null;
// }

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { login } from "@/app/redux/slices/authSlice";

export default function AuthPersist() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector(
    (state: RootState) => state.auth
  );

  // Load from storage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    const storedToken = localStorage.getItem("token"); // Changed from "auth-token" to "token"

    if (storedUser && storedToken) {
      dispatch(login({ user: JSON.parse(storedUser), token: storedToken }));
    }
  }, [dispatch]);

  // Save whenever auth state changes
  useEffect(() => {
    if (isAuthenticated && user && token) {
      localStorage.setItem("auth-user", JSON.stringify(user));
      localStorage.setItem("token", token); // Changed from "auth-token" to "token"
    } else {
      localStorage.removeItem("auth-user");
      localStorage.removeItem("token");
    }
  }, [isAuthenticated, user, token]);

  return null;
}