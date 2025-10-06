"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NavBar } from "@/components/navbar";
import useStore from "@/store/zustand";
import CryptoJS from "crypto-js";
import { Eye, EyeOff } from "lucide-react";
const SECRET_KEY = "vault-secret-key"; 

export default function VaultPage() {
  const router = useRouter();
  const { isLoggedIn } = useStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); 

  const decryptData = (cipherText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8) || cipherText;
    } catch {
      return cipherText;
    }
  };

  const fetchVault = async () => {
    try {
      const res = await fetch("/api/getvault", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch vault items");
      const data = await res.json();

      const decrypted = (data.entries || []).map((item) => ({
        ...item,
        username: decryptData(item.username),
        password: decryptData(item.password),
        notes: decryptData(item.notes),
      }));

      setItems(decrypted);
    } catch (err) {
      console.error("Error fetching vault:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchVault();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn == false) router.replace("/signin");
  }, [router, isLoggedIn]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deleteentry?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const toggleVisibility = (id, field) => {
    setVisible((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: !prev[id]?.[field] },
    }));
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes &&
        item.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoggedIn == null || isLoggedIn == false || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f6f6f6]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
          <h1 className="flex justify-center items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
            My Vault
          </h1>
          <input
            type="text"
            placeholder="Search by title, username, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border mb-4 border-gray-300 rounded-lg p-2 w-full mr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="flex justify-end mb-4">
            <Link
              href="/vault/new"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              + Add New Entry
            </Link>
          </div>

          {filteredItems.length === 0 ? (
            <p className="text-gray-600 text-center">
              No matching items found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-700">
                    <th className="p-3">Title</th>
                    <th className="p-3 w-40">Username</th>
                    <th className="p-3 w-40">Password</th>
                    <th className="p-3">Notes</th>
                    <th className="p-3">URL</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{item.title}</td>

                      {/* Username with eye icon */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-28 truncate">
                            {visible[item._id]?.username
                              ? item.username
                              : "••••••••"}
                          </span>
                          <button
                            onClick={() =>
                              toggleVisibility(item._id, "username")
                            }
                            className="text-gray-500 hover:text-gray-800"
                          >
                            {visible[item._id]?.username ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Password with eye icon */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-28 truncate">
                            {visible[item._id]?.password
                              ? item.password
                              : "••••••••"}
                          </span>
                          <button
                            onClick={() =>
                              toggleVisibility(item._id, "password")
                            }
                            className="text-gray-500 hover:text-gray-800"
                          >
                            {visible[item._id]?.password ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="p-3 max-w-[150px] truncate">
                        {item.notes || "-"}
                      </td>

                      <td className="p-3">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <button className="text-blue-600 hover:underline mr-3">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
