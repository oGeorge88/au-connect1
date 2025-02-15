import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (Object.values(formData).some((value) => value.trim() === "")) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => (window.location.href = "/signin"), 3000);
    } else {
      const data = await res.json();
      setErrorMessage(data.message || "Failed to sign up. Please try again.");
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
            Create an Account
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details to sign up
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-green-600 bg-green-100 p-3 rounded-md"
          >
            <p>Sign up successful! Redirecting to login...</p>
          </motion.div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  className="w-full h-12 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full h-12 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full h-12 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full h-12 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full h-12 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
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
                className="w-full flex justify-center px-4 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
        )}

        <div className="flex justify-between text-sm text-gray-600">
          <Link href="/signin" className="hover:text-indigo-500">
            Already have an account? Sign in
          </Link>
          <Link href="/" className="hover:text-indigo-500">
            Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
