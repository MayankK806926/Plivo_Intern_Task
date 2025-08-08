"use client";
import { signIn } from "next-auth/react";
import * as React from "react";

type LoginPageProps = { onLogin: (email: string, password: string) => void };

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (email === 'abciitian@gmail.com' && password === 'abciitian') {
      onLogin(email, password);
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Sign in to AI Playground</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="Enter your email"
            title="Email"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="Enter your password"
            title="Password"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </div>
  );
}
