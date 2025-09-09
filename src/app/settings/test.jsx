"use client";
import React, { useState } from "react";

const DarkModeTest = () => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDark(!dark);
  };

  return (
    <div className="p-6 bg-white text-black  dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold">Tailwind Dark Mode Test 🌙</h1>
      <p>If this works, background and text should switch 🎉</p>
      <button
        onClick={toggleTheme}
        className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default DarkModeTest;
