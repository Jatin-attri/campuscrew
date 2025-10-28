// app/auth/login/page.tsx
'use client';
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Welcome to EduHub</h2>
        <p className="text-center text-gray-600 mb-4">Login to access your dashboard</p>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-4 transition"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("github")}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded transition"
        >
          Sign in with GitHub
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}
