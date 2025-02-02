"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loadUser, login } from "@/store/AuthSlice";
import { RootState } from "@/store/store";

// Define types for form data and error response
interface ErrorResponse {
  error: string;
}

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Load user data from Redux or localStorage
  useEffect(() => {
    const loadUserData = async () => {
      dispatch(loadUser());
      setLoading(false);
    };

    loadUserData();
  }, [dispatch]);

  // If authenticated, redirect to the home page
  if (isAuthenticated) {
    router.push("/Home");
  }

  // Redirect to sign-in page if not authenticated, but only after loading state is complete
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, loading, router]);

  // Show a loading screen while waiting for authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle the sign-in form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send POST request to the API
      const res = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // Handle unsuccessful login
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Dispatch the login action with token and user data
      dispatch(login({ token: data.token, user: {
        email: data.email,
        id: "",
        name: ""
      } }));

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (err) {
      // Cast error to Error object if it's not an instance of Error
      const error = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* Display error message if there's one */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
