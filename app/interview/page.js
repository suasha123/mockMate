"use client";
import { NavBar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { IoMdPeople } from "react-icons/io";
import { FaLaptop } from "react-icons/fa6";
import { RiBrain2Line } from "react-icons/ri";
import { User } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import {
  MdOutlineMic,
  MdOutlineCameraAlt,
  MdTipsAndUpdates,
} from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import useStore from "@/store/zustand";
import { useRouter } from "next/navigation";
const StartInterviewPage = () => {
  const [round, setRound] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const { userdata, isLoggedIn } = useStore();
  const router = useRouter();
  const handleStart = async () => {
    if (!round || !role) {
      alert("Please select round and role before starting.");
      return;
    }
    try {
      const ivinfo = { round, role };
      const response = await fetch("/api/createroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ivinfo }),
      });
      if (response.ok) {
        console.log(response);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/signin");
    } else if (isLoggedIn === true && userdata?.roomid) {
      router.replace("/ivroom");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, userdata, router]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-[#f6f6f6]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <NavBar />
          <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 py-10">
            <div className="w-[95%] md:w-[70%] lg:w-[55%] bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-8">
              <div className="flex items-center gap-4 border-b pb-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {userdata.username}
                  </h2>
                  <p className="text-gray-500 text-sm">{userdata.email}</p>
                  <div className="flex gap-6 mt-2 text-sm text-gray-600">
                    <span className="flex items-center justify-center gap-2">
                      <IoBarChartSharp size={20} className="text-green-500" />
                      Completed: {userdata.completed || 0}
                    </span>
                    <span className="flex items-center justify-center gap-2 ">
                      <FaStar size={20} className="text-yellow-500" /> Avg
                      Score: {userdata.avg || 0} %
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Set up your Interview
                </h1>
                <p className="text-gray-500 mt-2">
                  Choose the round and role to personalize your mock interview.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                  Select Round
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "HR", icon: <IoMdPeople /> },
                    { name: "Technical", icon: <FaLaptop /> },
                    { name: "Behavioral", icon: <RiBrain2Line /> },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setRound(item.name)}
                      className={`flex flex-col items-center justify-center p-5 border rounded-xl text-gray-700 font-medium transition shadow-sm 
                    ${
                      round === item.name
                        ? "bg-blue-500 text-white border-blue-500 shadow-md scale-105"
                        : "hover:border-blue-400 hover:shadow-md"
                    } cursor-pointer`}
                    >
                      <span className="text-2xl mb-2">{item.icon}</span>
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                  Select Role
                </h2>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="cursor-pointer w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="">-- Choose a Role --</option>
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="data-analyst">Data Analyst</option>
                  <option value="ai-ml">AI/ML Engineer</option>
                </select>
              </div>

              <div className="bg-gray-50 border rounded-xl p-5 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MdTipsAndUpdates /> Interview Guidelines
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MdOutlineMic /> Ensure your microphone is working.
                  </li>
                  <li className="flex items-center gap-2">
                    <MdOutlineCameraAlt /> Keep your camera on for body-language
                    feedback.
                  </li>
                  <li className="flex items-center gap-2">
                    <BsClockHistory /> Each question has a time limit of 2–3
                    minutes.
                  </li>
                  <li>
                    Answer confidently and structure your response (Intro →
                    Explanation → Conclusion).
                  </li>
                  <li>
                    You will receive instant AI feedback after completion.
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleStart}
                  className="cursor-pointer flex  justify-center items-center gap-3 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                  <IoIosRocket size={20} /> Start Interview
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default StartInterviewPage;
