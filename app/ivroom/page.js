"use client";
import useStore from "@/store/zustand";
import { useState, useRef, useEffect } from "react";
import { MdOutlineMic, MdOutlineSend } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
export default function InterviewRoom() {
  const { isLoggedIn, userdata } = useStore();
  const userVideoRef = useRef(null);
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    initCamera();
  }, []);
  const session = {
    user: { username: "John Doe" },
    role: "Software Engineer",
    round: "Technical",
    latestFeedback: "You are doing great, keep it up!",
  };

  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello John! Welcome to your technical interview." },
  ]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const newMsg = { from: "user", text: userInput };
    setMessages([...messages, newMsg]);
    setUserInput("");

    // Hardcoded AI response
    const aiResponse = {
      from: "ai",
      text: "Got it! Let's move to the next question.",
    };
    setMessages((prev) => [...prev, aiResponse]);
  };

  return (
    <div className="h-screen bg-[#2b2c43] p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center p-4 bg-blue-600 text-white rounded-xl mb-6 shadow-md">
        <div>
          <h2 className="text-lg font-bold">{session.user.username}</h2>
          <p>
            {session.role} - {session.round} Round
          </p>
        </div>
        <p>Session ID: 12345</p>
      </header>

      <div className="w-full h-[70%] relative rounded-xl shadow-md p-4 flex space-x-4">
        <div className="flex-1 flex items-center justify-center relative bg-black rounded-xl overflow-hidden">
          <div className="text-white absolute top-2 left-2 bg-blue-900 p-3 rounded-full">
            {userdata.username}
          </div>
          <video
            ref={userVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
          ></video>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gray-800 rounded-xl">
          <img
            src="/ai-avatar.png"
            alt="AI Avatar"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        {/*<button
          className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 -translate-y-1/2 
               bg-red-600 text-white p-4 w-[90px] rounded-[15px] flex justify-center shadow-lg hover:bg-red-700 transition"
        >
          <MdCallEnd size={28} />
        </button>*/}
      </div>
      <div className="w-full max-w-4xl mt-4 p-4 bg-yellow-50 rounded-xl shadow-sm text-gray-800">
        <strong>AI Feedback / Emotion:</strong> {session.latestFeedback}
      </div>

      {/* Input Box */}
      {/*<div className="w-full max-w-4xl mt-4 flex items-center gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your answer..."
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <MdOutlineSend size={20} /> Send
        </button>
        <button className="bg-gray-200 px-3 py-2 rounded-xl hover:bg-gray-300 transition">
          <MdOutlineMic size={20} />
        </button>
      </div>*/}
    </div>
  );
}
