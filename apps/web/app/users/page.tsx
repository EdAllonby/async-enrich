import { Suspense } from "react";

// Type definitions for our API response
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
}

interface UsersResponse {
  success: boolean;
  data: User[];
  total: number;
}

// This is an async Server Component that fetches data on the server
async function UsersList() {
  // Fetch data from our Express API (running on port 3001)
  const response = await fetch("http://localhost:3001/api/users", {
    // Disable caching to always get fresh data in development
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: UsersResponse = await response.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {result.data.map((user) => (
        <div
          key={user.id}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
        >
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-50 mb-1">
              {user.name}
            </h2>
            <p className="text-sm text-indigo-400 font-medium mb-2">
              {user.role}
            </p>
            <p className="text-sm text-gray-400 mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {user.email}
            </p>
            <p className="text-xs text-gray-500">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Loading skeleton for Suspense fallback
function UsersLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex items-start gap-4 animate-pulse"
        >
          <div className="shrink-0">
            <div className="w-16 h-16 rounded-xl bg-white/10" />
          </div>
          <div className="flex-1">
            <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
            <div className="h-3 bg-white/10 rounded w-1/2 mb-3" />
            <div className="h-3 bg-white/10 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Main page component - this is also a Server Component
export default function UsersPage() {
  return (
    <main className="min-h-screen py-16 px-8 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4 tracking-tight">
          Team Directory
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-6 leading-relaxed">
          This page demonstrates a React Server Component (RSC) that
          asynchronously fetches data from our Express.js mock API.
        </p>
        <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          Server Component
        </div>
      </div>

      <Suspense fallback={<UsersLoading />}>
        <UsersList />
      </Suspense>

      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>
          Data fetched server-side from{" "}
          <code className="font-mono bg-white/[0.08] px-2 py-1 rounded text-xs">
            http://localhost:3001/api/users
          </code>
        </p>
      </div>
    </main>
  );
}
