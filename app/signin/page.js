"use client";
import { Suspense, useEffect, useState } from "react";
import useStore from "@/store/zustand";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

function SignInContent() {
  const { isLoggedIn } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userinfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleData = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userinfo }),
    });
    if (res.ok) {
      const data = await res.json();
      const setdata = useStore.getState().setuserdata;
      setdata(data.userInfo);
      router.replace("/");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [router, isLoggedIn]);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "email_registered") {
      window.alert("This email is already registered. Please login normally.");
    }
  }, [searchParams]);

  if (isLoggedIn === null || isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f6f6f6]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="w-full flex justify-center items-center min-h-screen bg-[#f6f6f6]">
      <div className="w-[90%] sm:w-[400px] bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-[#3278e6] text-center text-2xl font-bold tracking-tight mb-5">
          safeVault
        </h1>

        <h3 className="text-xl font-bold text-center text-[#595959] mb-6">
          Sign In to continue
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={userinfo.email}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-none border-gray-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={userinfo.password}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-xl focus:border-none border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition"
          onClick={handleData}
        >
          Sign In
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={() => (window.location.href = "/api/auth/google")}
          className="cursor-pointer w-full flex items-center justify-center gap-2 border py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <FcGoogle className="w-6 h-6" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign Up
          </a>
        </p>
      </div>
    </section>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
