import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                firstName,
                lastName,
                email,
                password,
            }),
        });

        setLoading(false);

        if (res.ok) {
            setSuccess(true);

            setTimeout(() => {
                window.location.href = '/signin';
            }, 3000);
        } else {
            const data = await res.json();
            alert(`Failed to sign up: ${data.message}`);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <Image
                        src="/logo.jpg"
                        alt="AU Connect Intercom Logo"
                        width={100}
                        height={100}
                        priority
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 text-center">
                        Please fill in the form to create an account
                    </p>
                </div>

                {success ? (
                    <div className="text-center text-green-600">
                        <p>Sign up successful! Redirecting to login...</p>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="first-name" className="sr-only">
                                    First Name
                                </label>
                                <input
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    required
                                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="sr-only">
                                    Last Name
                                </label>
                                <input
                                    id="last-name"
                                    name="lastName"
                                    type="text"
                                    required
                                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                disabled={loading}
                            >
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="flex justify-between mt-6">
                    <Link href="/signin" className="text-indigo-600 hover:text-indigo-500">
                        Already have an account? Sign in
                    </Link>
                    <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                        Go back to homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}
