"use client";
import useStore from "@/store/zustand";
import { useState, useRef, useEffect } from "react";
import { MdOutlineMic, MdOutlineSend } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";

import { FaCircleStop, FaMicrophone } from "react-icons/fa6";

export default function InterviewRoom() {
  const { isLoggedIn, userdata } = useStore();
  const userVideoRef = useRef(null);
  const [recordedURL, setRecordedURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);
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
    startRecording();
    setIsRecording(true);
  }, []);
  useEffect(() => {
    if (isRecording) {
      setTimeout(() => {
        stopRecording();
      }, 10000);
    }
  }, [isRecording]);
  const startRecording = async () => {
    setIsRecording(true);
    try {
      setSeconds(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;

      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        const file = new File([recordedBlob], "recording.webm", {
          type: "audio/webm",
        });
        sendaudio(file);
        setRecordedURL(url);
        console.log(url);
        chunks.current = [];
        clearInterval(timerRef.current);
      };

      mediaRecorder.current.start();
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing mic:", error);
      setIsRecording(false);
    }
  };
  const sendaudio = async (audiofile) => {
    try {
      const formdata = new FormData();
      formdata.append("file", audiofile);
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formdata,
      });
      if (response.ok) {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

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

    const aiResponse = {
      from: "ai",
      text: "Got it! Let's move to the next question.",
    };
    setMessages((prev) => [...prev, aiResponse]);
  };

  return (
    <div className="h-screen bg-black p-6 flex flex-col items-center">
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
            {userdata?.username}
          </div>
          <video
            ref={userVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
          ></video>
        </div>
        <div className="flex-1 flex items-center justify-center bg-[#2b2c43] rounded-xl">
          <img
            src="/ai-avatar.png"
            alt="AI Avatar"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
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
        <button
          onClick={toggleRecording}
          className={`px-3 py-2 rounded-xl transition ${
            isRecording ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <MdOutlineMic size={20} />
        </button>
      </div>*/}

      {recordedURL && <audio controls src={recordedURL} />}
    </div>
  );
}
