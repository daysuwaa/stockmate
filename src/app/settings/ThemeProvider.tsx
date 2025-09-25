"use client";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { darkMode } = useSelector((s: RootState) => s.settings.preferences);

  return (
    <div className={darkMode === "dark" ? "bg-black text-green-600" : "bg-white text-black"}>
      {children}
    </div>
  );
}