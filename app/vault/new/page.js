"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import useStore from "@/store/zustand";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTKEY;

export default function AddNewEntry() {
  const router = useRouter();
  const { isLoggedIn } = useStore();

  const [form, setForm] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const encryptData = (text) => {
    if (!text) return "";
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const encryptedForm = {
        title: form.title,
        username: encryptData(form.username),
        password: encryptData(form.password),
        url: form.url,
        notes: form.notes,
      };

      const res = await fetch("/api/saveentry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: encryptedForm }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/vault");
      } else {
        alert(data.msg || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Network error — please try again!");
    }
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/signin");
    }
  }, [router, isLoggedIn]);

  if (isLoggedIn == null || isLoggedIn == false) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f6f6f6]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Add New Entry
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title (e.g., Gmail)"
              className="w-full border p-2 rounded-lg"
              required
            />
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username or Email"
              className="w-full border p-2 rounded-lg"
              required
            />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border p-2 rounded-lg"
              required
            />
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="Website URL (optional)"
              className="w-full border p-2 rounded-lg"
            />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes (optional)"
              className="w-full border p-2 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Entry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
