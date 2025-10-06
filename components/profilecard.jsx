import { IoIosSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import useStore from "@/store/zustand";
import { useRouter } from "next/navigation";
export const ProfileCard = ({ setShowProfile }) => {
  const router = useRouter();
  const { userdata } = useStore();
  const getAvatarLetter = (name) => {
    if (!name) return "";
    return name[0].toUpperCase();
  };
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/signout");
      if (res.ok) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log('Error occurred')
      console.log(err);
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-400 p-3">
      <div className="flex items-center gap-4">
        {userdata?.profile ? (
          <img
            src={userdata.profile}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
            {getAvatarLetter(userdata?.username)}
          </div>
        )}
        <div>
          <h2 className="text-[16px] font-semibold text-gray-800">
            {userdata?.username}
          </h2>
          <p className="text-sm text-gray-500">{userdata?.email}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <button
          className="w-full cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in  text-left transition-colors flex items-center gap-3"
          onClick={() => {
            router.push("/account-settings");
            setShowProfile(false);
          }}
        >
          <IoIosSettings size={18} />
          Manage Account
        </button>
        <button
          className="w-full cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-all duration-100 ease-in text-left transition-colors flex items-center gap-3"
          onClick={handleLogout}
        >
          <IoLogOutOutline size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};
