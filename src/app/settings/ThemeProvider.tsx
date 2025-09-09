"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { updatePreferences } from "../redux/slices/settingsSlice";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.settings.preferences.darkMode);

  // 1) On first client render, read localStorage and hydrate Redux
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved === "light" || saved === "dark") {
      dispatch(updatePreferences({ darkMode: saved }));
    }
  }, [dispatch]);

  // 2) Whenever Redux theme changes, update <html> and persist
  useEffect(() => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme); // 'light' | 'dark'
  if (typeof window !== "undefined") {
    window.localStorage.setItem("theme", theme);
  }
}, [theme]);

  return <>{children}</>;
}