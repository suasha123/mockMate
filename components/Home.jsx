"use client";

import Link from "next/link";
import { useEffect } from "react";
import PasswordGenerator from "./PasswordGeneartor";
export default function HomePage() {

  useEffect(() => {
    document.title = "SecureVault | Home";
  }, []);

  return (
    <div className="p-2 min-h-screen bg-gray-50 sm :p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Welcome to SecureVault 
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Generate strong passwords and manage them securely in your personal vault.
        </p>

        <PasswordGenerator />

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/vault"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to My Vault
          </Link>

          <Link
            href="/vault/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add New Entry
          </Link>
        </div>

        {/* Optional Recent Items section */}
        <div className="mt-10 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Recent Items
          </h2>
          <p className="text-gray-500">
            Your recently added passwords will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
