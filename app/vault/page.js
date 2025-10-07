"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NavBar } from "@/components/navbar";
import useStore from "@/store/zustand";
import CryptoJS from "crypto-js";
import { Eye, Copy } from "lucide-react";

const SECRET_KEY = "vault-secret-key";

export default function VaultPage() {
  const router = useRouter();
  const { isLoggedIn } = useStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [viewValueModal, setViewValueModal] = useState(null);

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

  const handleEditClick = (item) => {
    setEditingItem({ ...item });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/updateentry?id=${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingItem.title,
          username: editingItem.username,
          password: editingItem.password,
          notes: editingItem.notes,
          url: editingItem.url,
        }),
      });

      if (!res.ok) {
        window.alert("Update failed");
        return;
      }
      const updatedItem = await res.json();
      setItems((prev) =>
        prev.map((i) => (i._id === editingItem._id ? updatedItem : i))
      );

      setEditingItem(null);
    } catch (err) {
      console.error("Error updating entry:", err);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes &&
        item.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

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
      <div className="min-h-screen bg-gray-50 p-6 relative">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
          <h1 className="flex justify-center items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
            My Vault
          </h1>

          <input
            type="text"
            placeholder="Search by title, username, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border mb-4 border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => setViewingItem(item)}
                    >
                      <td className="p-3 font-medium">{item.title}</td>

                      {/* Username */}
                      <td className="p-3">
                        {"••••••••"}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewValueModal({
                              label: "Username",
                              value: item.username,
                            });
                          }}
                          className="ml-2 text-gray-500 hover:text-gray-800"
                        >
                          <Eye size={16} />
                        </button>
                      </td>

                      {/* Password */}
                      <td className="p-3">
                        {"••••••••"}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewValueModal({
                              label: "Password",
                              value: item.password,
                            });
                          }}
                          className="ml-2 text-gray-500 hover:text-gray-800"
                        >
                          <Eye size={16} />
                        </button>
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
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:underline"
                          >
                            Visit
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(item);
                          }}
                          className="text-blue-600 hover:underline mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
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

        {/* 🔹 View Value Modal (Username/Password) */}
        {viewValueModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl relative">
              <h2 className="text-xl font-semibold mb-3 text-center">
                {viewValueModal.label}
              </h2>
              <div className="bg-gray-100 p-3 rounded-lg break-all flex justify-between items-center">
                <span className="font-medium">{viewValueModal.value}</span>
                <button
                  onClick={() => handleCopy(viewValueModal.value)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Copy size={18} />
                </button>
              </div>

              <div className="flex justify-end mt-5">
                <button
                  onClick={() => setViewValueModal(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing View Entry Modal */}
        {viewingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl relative">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {viewingItem.title}
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm">Username</p>
                  <p className="font-medium break-all bg-gray-100 p-2 rounded">
                    {viewingItem.username}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Password</p>
                  <p className="font-medium break-all bg-gray-100 p-2 rounded">
                    {viewingItem.password}
                  </p>
                </div>
                {viewingItem.notes && (
                  <div>
                    <p className="text-gray-500 text-sm">Notes</p>
                    <p className="font-medium break-words bg-gray-100 p-2 rounded">
                      {viewingItem.notes}
                    </p>
                  </div>
                )}
                {viewingItem.url && (
                  <div>
                    <p className="text-gray-500 text-sm">URL</p>
                    <a
                      href={viewingItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {viewingItem.url}
                    </a>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setViewingItem(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal Overlay */}
        {editingItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Entry</h2>
              <input
                type="text"
                placeholder="Title"
                value={editingItem.title}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, title: e.target.value })
                }
                className="w-full border rounded-lg p-2 mb-3"
              />
              <input
                type="text"
                placeholder="Username"
                value={editingItem.username}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, username: e.target.value })
                }
                className="w-full border rounded-lg p-2 mb-3"
              />
              <input
                type="text"
                placeholder="Password"
                value={editingItem.password}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, password: e.target.value })
                }
                className="w-full border rounded-lg p-2 mb-3"
              />
              <textarea
                placeholder="Notes"
                value={editingItem.notes}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, notes: e.target.value })
                }
                className="w-full border rounded-lg p-2 mb-3"
              />
              <input
                type="text"
                placeholder="URL"
                value={editingItem.url}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, url: e.target.value })
                }
                className="w-full border rounded-lg p-2 mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
