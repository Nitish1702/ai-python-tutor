"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loadUser, logout } from "@/store/AuthSlice";
import { setLoading } from "@/store/chatSlice";

// Dummy Authentication Check (can be replaced with actual authentication logic)


export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    const loadUserData = async () => {
      dispatch(loadUser());
      setLoading(false);
    };

    loadUserData();
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logout());
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-pink-400">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full p-6 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-600">LearnPlay</h1>
        <div className="flex space-x-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => router.push("/signin")}
                className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  return router.push("/signup");
                }}
                className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={navigateToDashboard}
                className="px-6 py-2 text-white bg-purple-600 rounded-full hover:bg-purple-700 transition"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen text-center text-white px-6">
        <h2 className="text-5xl font-extrabold leading-tight mb-4">
          Welcome to LearnPlay!
        </h2>
        <p className="text-xl mb-8">
          Discover, learn, and have fun with Python! Let&apos;s embark on this
          learning journey together!
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-8 py-4 text-white bg-yellow-500 rounded-full text-lg hover:bg-yellow-600 transition"
        >
          Get Started
        </button>
      </div>

      {/* Footer (optional) */}
      <footer className="absolute bottom-0 w-full p-6 bg-white shadow-md flex justify-center items-center">
        <p className="text-sm text-gray-600">
          © 2025 LearnPlay, All rights reserved.
        </p>
      </footer>
    </div>
  );
}
