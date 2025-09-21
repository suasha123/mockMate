"use client";
import { NavBar } from "@/components/navbar";
import {
  FiSettings,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import useStore from "@/store/zustand";
import { useRouter } from "next/navigation";

const connectaccountPage = () => {
  const [loading, setLoading] = useState(true);
  const { userdata, isLoggedIn } = useStore();
  const router = useRouter();

  // Dummy social accounts data
  const [accounts, setAccounts] = useState([
    { name: "Facebook", connected: true, icon: <FiFacebook size={25} /> },
    { name: "Twitter", connected: false, icon: <FiTwitter size={25} /> },
    { name: "Instagram", connected: true, icon: <FiInstagram size={25} /> },
    { name: "LinkedIn", connected: false, icon: <FiLinkedin size={25} /> },
  ]);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/signin");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, userdata, router]);

  const toggleConnection = (index) => {
    setAccounts((prev) => {
      const updated = [...prev];
      updated[index].connected = !updated[index].connected;
      return updated;
    });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-[#f6f6f6]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <NavBar />
          <section className="w-full flex justify-center">
            <div className="w-[100%] md:w-[80%] sm:w-[90%] lg:w-[70%] mt-[50px] ml-[10px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[15px] items-center">
                  <FiSettings size={35} style={{ color: "#3278e6" }} />
                  <h1
                    style={{ fontFamily: "Inter, sans-serif" }}
                    className="sm:text-3xl lg:text-5xl font-bold text-[#2b2c43]"
                  >
                    Connect Your Social Accounts
                  </h1>
                </div>
                <div>
                  <p className="break-words text-[11px] sm:text-[13px] lg:text-[16px] text-gray-600 relative md:left-[55px]">
                    Link your social media accounts to start creating and
                    scheduling posts
                  </p>
                </div>
              </div>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <hr className="flex-grow border-gray-300" />
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                {accounts.map((acc, idx) => (
                  <div
                    key={acc.name}
                    className={`flex flex-col p-4 border rounded-lg flex-1 min-w-[100%]  lg:min-w-[350px] ${
                      acc.connected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {acc.icon}
                        <span className="font-medium text-sm sm:text-[13px] lg:text-base">
                          {acc.name}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleConnection(idx)}
                        className={`w-[100px] sm:px-4 py-1 rounded font-medium text-xs sm:text-sm ${
                          acc.connected
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {acc.connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-[11px] md:text-sm lg:text-[14px]">
                      {acc.name === "Facebook" &&
                        "Connect to a Page or Group to schedule posts."}
                      {acc.name === "Twitter" &&
                        "Connect your account to post tweets directly."}
                      {acc.name === "Instagram" &&
                        "Only Business or Creator accounts are supported."}
                      {acc.name === "LinkedIn" &&
                        "Connect to post updates to your profile or company page."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default connectaccountPage;
