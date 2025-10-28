"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { fetchMe } from "../../redux/slices/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(fetchMe());
  }
}, [dispatch]);
}