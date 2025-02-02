"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState<{ name: string; email: string; avatar: string; apiKey: string } | null>(null);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();

  // Fetch user profile
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch("/api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "user@example.com" }), // Replace with dynamic email
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser({
          name: data.user.name,
          email: data.user.email,
          avatar: data.user.avatar || "/default-avatar.png",
          apiKey: data.user.apiKey || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    fetchUserProfile();
  }, []);

  // Handle avatar file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("email", user?.email || "");
    if (apiKey) formData.append("apiKey", apiKey);
    if (newAvatar) formData.append("avatar", newAvatar);

    try {
      const response = await fetch("/api/updateUser", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update user profile");

      const updatedUser = await response.json();
      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <h2 className="text-lg font-bold mb-4">User Profile</h2>

      {user && (
        <>
          {/* Avatar Upload with Preview */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={previewAvatar || user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-2 border-white object-cover"
            />
            <input type="file" onChange={handleFileChange} className="text-gray-300" />
          </div>

          {/* API Key Input */}
          <div className="mt-4">
            <label className="block text-sm">Gemini API Key:</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 rounded"
            />
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdateProfile}
            className="w-full p-2 mt-4 bg-blue-600 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>

          {/* Back to Dashboard */}
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full p-2 mt-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Back to Dashboard
          </button>
        </>
      )}
    </div>
  );
}
