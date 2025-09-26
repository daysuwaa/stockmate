"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "@/app/redux/slices/authSlice";
import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useRouter } from "next/navigation";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Always try to fetch user on load if token exists
    dispatch(fetchMe());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;

  if (!isAuthenticated) {
    router.push("/auth/login");
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;