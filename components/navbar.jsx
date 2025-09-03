"use client";

import useStore from "@/store/zustand";
import { useRouter } from "next/navigation";
export const NavBar = ({ user }) => {
  const router = useRouter();
  const { isLoggedIn, userdata } = useStore();
  console.log(userdata);
  const gotSignIn = () => {
    router.push("/signin");
  };
  return (
    <nav className="w-full flex justify-center pt-0 sm:pt-8  sticky top-0 bg-[#f6f6f6] z-999">
      <div className="flex items-center justify-between w-[100%] sm:w-[90%] md:w-[85%] lg:w-[70%] px-3 sm:px-8 py-4 bg-white shadow-md  sm:rounded-2xl">
        <h1 className="text-[#3278e6] text-2xl font-bold tracking-tight">
          mockMate
        </h1>
        <ul className="hidden sm:flex sm:gap-8 text-gray-600 sm:block text-[13px] md:text-[16px]">
          <li>
            <a
              href="/"
              className="hover:text-[#3278e6] transition-colors duration-200 ease"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              className="hover:text-[#3278e6] transition-colors duration-200 ease"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-[#3278e6] transition-colors duration-200 ease"
            >
              About
            </a>
          </li>
        </ul>
        {isLoggedIn ? (
          userdata.username
        ) : (
          <button
            className="cursor-pointer active:bg-[#3b82f6] px-5 py-2 rounded-xl bg-[#2b2c43] text-white text-[13px] md:text-[16px] shadow hover:bg-[#2563eb] transition-all duration-200 ease-in"
            onClick={gotSignIn}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};
