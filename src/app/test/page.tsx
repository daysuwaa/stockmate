"use client"; // if you’re using Next.js App Router
import React, { useState } from "react";

export default function TestApi() {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/test");
      const json = await res.json();
      setData(json.message);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchData}
        className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded"
      >
        Call Backend
      </button>
      <p className="mt-4">{data}</p>
    </div>
  );
}
