"use client";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
const Signup = () => {
  const [userinfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleData = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userinfo }),
    });
    console.log(res);
  };

  return (
    <section className="w-full flex justify-center items-center min-h-screen bg-[#f6f6f6]">
      <div className="w-[90%] sm:w-[400px] bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-[#3278e6] text-center text-2xl font-bold tracking-tight mb-5">
          mockMate
        </h1>

        <h3 className="text-xl font-bold  text-center text-[#595959] mb-6">
          Create Account
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={userinfo.email}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="Enter your email"
            className="w-full px-4 py-2 border  rounded-xl focus:outline-none focus:border-none  border-grey-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={userinfo.password}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-xl focus:border-none  border-grey-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleData}
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="cursor-pointer w-full flex items-center justify-center gap-2 border py-2 rounded-xl hover:bg-gray-100 transition">
          <FcGoogle className="w-6 h-6" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </section>
  );
};

export default Signup;
