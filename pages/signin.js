import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router"; // Next.js router for redirection
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // To handle routing after successful login

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false, // Prevent default NextAuth redirect
        username,
        password,
        callbackUrl: "/", // Redirect to homepage after successful login
      });

      if (res?.ok) {
        // Use the router push method to redirect after successful login
        router.push(res?.url || "/"); // Use the URL from the response or fallback to '/'
      } else {
        setErrorMessage(res?.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <div className="flex flex-col items-center">
          <Image
            src="/logo.jpg"
            alt="AU Connect Intercom Logo"
            width={80}
            height={80}
            priority
            className="rounded-full shadow-md"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 text-center">
            Welcome Back
          </h2>
          <p className="mt-1 text-sm text-gray-500">Sign in to continue</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">
              {errorMessage}
            </p>
          )}

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center px-4 py-2 text-white rounded-md text-sm ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="flex justify-between text-sm text-gray-600">
          <Link href="/signup" className="hover:text-indigo-500">
            Sign up
          </Link>
          <Link href="/" className="hover:text-indigo-500">
            Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
