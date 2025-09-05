"use client";

import useStore from "@/store/zustand";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ProfileCard } from "./profilecard";
export const NavBar = () => {
  const router = useRouter();
  const { isLoggedIn, userdata } = useStore();
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);

  const gotSignIn = () => {
    router.push("/signin");
  };
  const getAvatarLetter = (name) => {
    if (!name) return "";
    return name[0].toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full flex justify-center pt-0 sm:pt-8 sticky top-0 bg-[#f6f6f6] z-50">
      <div className="flex items-center justify-between w-[100%] sm:w-[90%] md:w-[85%] lg:w-[70%] px-3 sm:px-8 py-4 bg-white shadow-md sm:rounded-2xl relative">
        <h1 className="text-[#3278e6] text-2xl font-bold tracking-tight">
          mockMate
        </h1>

        <ul className="hidden sm:flex sm:gap-8 text-gray-600 sm:block text-[13px] md:text-[16px]">
          <li>
            {isLoggedIn === null ? (
              <span className="inline-block bg-gray-300 rounded w-12 h-[24px] animate-pulse"></span>
            ) : (
              <a href="/" className="hover:text-[#3278e6] transition-colors">
                Home
              </a>
            )}
          </li>
          <li>
            {isLoggedIn === null ? (
              <span className="inline-block bg-gray-300 rounded w-15 h-[24px] animate-pulse"></span>
            ) : (
              <a
                href="/dashboard"
                className="hover:text-[#3278e6] transition-colors"
              >
                Dashboard
              </a>
            )}
          </li>
          <li>
            {isLoggedIn === null ? (
              <span className="inline-block bg-gray-300 rounded w-15 h-[24px] animate-pulse"></span>
            ) : (
              <a
                href="/about"
                className="hover:text-[#3278e6] transition-colors"
              >
                About
              </a>
            )}
          </li>
        </ul>

        {isLoggedIn===null  ? (<span className="inline-block bg-gray-300 rounded w-[40px] h-[40px] rounded-full animate-pulse"></span>) : isLoggedIn ?  (
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg cursor-pointer shadow hover:scale-105 transition-transform"
              onClick={() => setShowProfile(!showProfile)}
            >
              {userdata?.profile ? (
                <img
                  src={userdata.profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  {getAvatarLetter(userdata?.username)}
                </div>
              )}
            </div>
            {showProfile && <ProfileCard setShowProfile={setShowProfile} />}
          </div>
        ) : (
          <button
            className="cursor-pointer active:bg-[#3b82f6] px-5 py-2 rounded-xl bg-[#2b2c43] text-white text-[13px] md:text-[16px] shadow hover:bg-[#2563eb] transition-all"
            onClick={gotSignIn}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};
