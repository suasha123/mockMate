"use client";
import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeLookAlikes, setExcludeLookAlikes] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const lookAlikes = /[0O1lI]/g;

    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    if (excludeLookAlikes) result = result.replace(lookAlikes, "");

    setPassword(result);
    copyToClipboard(result);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      navigator.clipboard.writeText("");
      setCopied(false);
    }, 15000);
  };

  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Password Generator
      </h2>

      <div className="flex items-center gap-2 mb-3">
        <label className="text-sm font-medium">Length:</label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="flex-1 accent-blue-600"
        />
        <span className="w-8 text-center font-medium">{length}</span>
      </div>

      <div className="space-y-1 mb-3 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include numbers
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include symbols
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={excludeLookAlikes}
            onChange={() => setExcludeLookAlikes(!excludeLookAlikes)}
          />
          Exclude look-alike characters (0 O 1 l I)
        </label>
      </div>

      <button
        onClick={generatePassword}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
      >
        Generate Password
      </button>

      {password && (
        <div className="mt-3 p-2 bg-white border rounded-md text-center font-mono break-all">
          {password}
          <div className="text-xs text-gray-500 mt-1">
            {copied ? "Copied to clipboard (auto-clears in 15 s)" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
