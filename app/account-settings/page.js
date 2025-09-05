"use client";
import useStore from "@/store/zustand";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
const AccountInfo = () => {
  const { isLoggedIn, userdata } = useStore();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();
  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileinput = event.target.files[0];
    if (fileinput) {
      const imageUrl = URL.createObjectURL(fileinput);
      setPreview(imageUrl);
      setFile(fileinput);
    }
  };

  const handleupload = async () => {
    try {
      const f = new FormData();
      f.append("profilepic", file);
      const response = await fetch("/api/uploadprofile", {
        method: "POST",
        body: f,
      });
      if (response.status === 401) {
        router.replace("/signin");
      }
      if (response.status === 200) {
        const data = await response.json();
        const setdata = useStore.getState().setuserdata;
        setdata({ profile: data.newPicUrl });
        router.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isLoggedIn===false) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn===false) {
    return null;
  }

  if (isLoggedIn === null) {
    return (
      <section className="w-full min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-[#f6f6f6] py-10">
      <div className="w-[90%] md:w-[70%] lg:w-[40%] bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex items-center gap-5 border-b pb-6">
          {userdata.profile ? (
            <img
              src={userdata.profile}
              alt="Profile"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          ) : (
            <div className=" w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-2xl">
              {userdata.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {userdata.username}
            </h2>
            <p className="text-sm text-gray-500">{userdata.email}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <div className="flex justify-between gap-3">
              <input
                type="text"
                defaultValue={userdata.username}
                className="w-[70%] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors cursor-pointer">
                Change
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg">
                    {userdata.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {preview ? (
                <button
                  onClick={handleupload}
                  className="px-4 py-2 rounded-lg bg-green-400 text-white text-sm hover:bg-green-600 transition-colors cursor-pointer"
                >
                  Upload Image
                </button>
              ) : (
                <button
                  onClick={handleProfilePicClick}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Change
                </button>
              )}
            </div>
          </div>
          <div>
            <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;
