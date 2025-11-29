import { Suspense } from "react";
import Link from "next/link";
import { UserExtraDetailsProvider, UserAge, UserLocation } from "./user-extra-details";

// Type definitions for our API response
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
}

interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface UsersResponse {
  success: boolean;
  data: User[];
  pagination: Pagination;
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

// This is an async Server Component that fetches data on the server
async function UsersList({ page }: { page: number }) {
  // Fetch data from our Express API with pagination
  const response = await fetch(
    `http://localhost:3001/api/users?page=${page}&pageSize=10`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: UsersResponse = await response.json();
  const { data: users, pagination } = result;
  
  // Get all user IDs for the extra details fetch
  const userIds = users.map((u) => u.id);

  return (
    <>
      {/* Client component that fetches extra details asynchronously */}
      <UserExtraDetailsProvider userIds={userIds} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 flex items-start gap-3 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 hover:border-indigo-400/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-base font-semibold text-gray-50">
                  {user.name}
                </h2>
                {/* Age loads asynchronously after initial render */}
                <UserAge userId={user.id} />
              </div>
              <p className="text-xs text-indigo-400 font-medium mb-1">
                {user.role}
              </p>
              <p className="text-xs text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap mb-1">
                {user.email}
              </p>
              {/* Location loads asynchronously after initial render */}
              <UserLocation userId={user.id} />
            </div>
            <div className="text-xs text-gray-500 font-mono">
              #{user.id}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <PaginationControls pagination={pagination} />
    </>
  );
}

// Pagination controls component
function PaginationControls({ pagination }: { pagination: Pagination }) {
  const { currentPage, totalPages, totalItems, hasNextPage, hasPrevPage } = pagination;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) pages.push("...");
      
      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push("...");
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
      {/* Page info */}
      <p className="text-sm text-gray-400">
        Showing page <span className="text-indigo-400 font-semibold">{currentPage}</span> of{" "}
        <span className="text-indigo-400 font-semibold">{totalPages}</span>
        <span className="text-gray-500 ml-2">({totalItems} total users)</span>
      </p>

      {/* Page navigation */}
      <nav className="flex items-center gap-1">
        {/* Previous button */}
        {hasPrevPage ? (
          <Link
            href={`/users?page=${currentPage - 1}`}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] hover:border-indigo-400/50 transition-all text-sm font-medium"
          >
            ← Prev
          </Link>
        ) : (
          <span className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-gray-600 text-sm font-medium cursor-not-allowed">
            ← Prev
          </span>
        )}

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((pageNum, idx) =>
            pageNum === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <Link
                key={pageNum}
                href={`/users?page=${pageNum}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  pageNum === currentPage
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] hover:border-indigo-400/50"
                }`}
              >
                {pageNum}
              </Link>
            )
          )}
        </div>

        {/* Next button */}
        {hasNextPage ? (
          <Link
            href={`/users?page=${currentPage + 1}`}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] hover:border-indigo-400/50 transition-all text-sm font-medium"
          >
            Next →
          </Link>
        ) : (
          <span className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-gray-600 text-sm font-medium cursor-not-allowed">
            Next →
          </span>
        )}
      </nav>
    </div>
  );
}

// Loading skeleton for Suspense fallback
function UsersLoading() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 flex items-start gap-3 animate-pulse"
          >
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-lg bg-white/10" />
            </div>
            <div className="flex-1">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2 mb-2" />
              <div className="h-3 bg-white/10 rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="h-10 bg-white/10 rounded-lg w-64 animate-pulse" />
      </div>
    </>
  );
}

// Main page component - this is also a Server Component
export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  return (
    <main className="min-h-screen py-12 px-6 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-3 tracking-tight">
          Team Directory
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto mb-4 leading-relaxed">
          Users load instantly, then <span className="text-emerald-400">age</span> and{" "}
          <span className="text-gray-300">location</span> are adorned asynchronously.
        </p>
        <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 px-3 py-1.5 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
          RSC + Async Client Enrichment
        </div>
      </div>

      <Suspense fallback={<UsersLoading />}>
        <UsersList page={page} />
      </Suspense>

      <div className="text-center mt-10 text-gray-500 text-xs">
        <p>
          Initial data from{" "}
          <code className="font-mono bg-white/[0.08] px-2 py-1 rounded">
            /api/users
          </code>
          {" "}&bull;{" "}
          Extra details from{" "}
          <code className="font-mono bg-white/[0.08] px-2 py-1 rounded">
            /api/users/details
          </code>
        </p>
      </div>
    </main>
  );
}
