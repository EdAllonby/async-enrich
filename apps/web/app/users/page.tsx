import { Suspense } from "react";
import Link from "next/link";
import { PageNav } from "../components/page-nav";
import { LeadershipTeam, LeadershipLoading } from "./leadership-team";
import { UsersList, UsersLoading } from "./users-list";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  return (
    <main className="min-h-screen py-12 px-6 bg-linear-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] font-sans">
      <div className="text-center mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-3 tracking-tight">
          Team Directory
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto mb-4 leading-relaxed">
          Users load instantly, then{" "}
          <span className="text-emerald-400">age</span> and{" "}
          <span className="text-gray-300">location</span> are adorned
          asynchronously.
        </p>
        <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 px-3 py-1.5 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
          RSC + Shared React Query Cache
        </div>
      </div>

      <PageNav current="users" />

      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2 flex items-center justify-center gap-2">
            <span className="text-amber-400">★</span>
            Leadership Team
            <span className="text-amber-400">★</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Our managers and product leaders
          </p>
        </div>
        <Suspense fallback={<LeadershipLoading />}>
          <LeadershipTeam />
        </Suspense>
      </section>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <section>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            All Team Members
          </h2>
          <p className="text-gray-500 text-sm">
            Browse our full team directory
          </p>
        </div>
        <Suspense fallback={<UsersLoading />}>
          <UsersList page={page} />
        </Suspense>
      </section>

      <div className="text-center mt-10 text-gray-500 text-xs">
        <p>
          Initial data from{" "}
          <code className="font-mono bg-white/8 px-2 py-1 rounded">
            /api/users
          </code>{" "}
          +{" "}
          <code className="font-mono bg-white/8 px-2 py-1 rounded">
            /api/users/leadership
          </code>
          <br />
          Extra details from{" "}
          <code className="font-mono bg-white/8 px-2 py-1 rounded">
            /api/users/details
          </code>{" "}
          (shared cache)
        </p>
      </div>
    </main>
  );
}
