"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { updateProfile } from "@/app/redux/slices/settingsSlice";

export default function SettingsPersist() {
  const dispatch = useDispatch();
  const profile = useSelector((s: RootState) => s.settings.profile);

  // ✅ Load profile from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("settings-profile");
      if (raw) {
        const saved = JSON.parse(raw);
        dispatch(updateProfile(saved));
      }
    } catch (e) {
      console.error("Failed to load profile:", e);
    }
  }, [dispatch]);

  // ✅ Save profile whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("settings-profile", JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to save profile:", e);
    }
  }, [profile]);

  return null;
}