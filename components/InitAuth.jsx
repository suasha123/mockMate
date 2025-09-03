"use client";
import { useEffect } from "react";
import useStore from "@/store/zustand";

export default function Init() {
  const setdata = useStore.getState().setuserdata;
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/checksession");
        if (res.ok) {
          const data = await res.json();
          setdata(data.userInfo);
        } else {
          setdata(null);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setdata(null);
      }
    };

    checkSession();
  }, []);

  return null;
}
