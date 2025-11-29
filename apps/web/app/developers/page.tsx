import { Suspense } from "react";
import Link from "next/link";
import { PageNav } from "@/components/page-nav";
import { DevelopersList, DevelopersLoading } from "./developers-list";

export default async function DevelopersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  return (
    <main className="min-h-screen py-12 px-6 bg-linear-to-br from-[#0f1f0f] via-[#1a2e1a] to-[#16213e] font-sans">
      <div className="text-center mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-3 tracking-tight">
          Developer Directory
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto mb-4 leading-relaxed">
          Our engineering talent. Extra details like{" "}
          <span className="text-emerald-400">age</span> and{" "}
          <span className="text-gray-300">location</span> are shared across
          pages.
        </p>
        <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Shared React Query Cache
        </div>
      </div>

      <PageNav current="developers" />

      <section>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2 flex items-center justify-center gap-2">
            <span className="text-emerald-400">💻</span>
            Engineering Team
            <span className="text-emerald-400">💻</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Frontend, Backend, Full Stack, and DevOps engineers
          </p>
        </div>
        <Suspense fallback={<DevelopersLoading />}>
          <DevelopersList page={page} />
        </Suspense>
      </section>

      <div className="text-center mt-10 text-gray-500 text-xs">
        <p>
          Data from{" "}
          <code className="font-mono bg-white/8 px-2 py-1 rounded">
            /api/users/developers
          </code>
          <br />
          Extra details from{" "}
          <code className="font-mono bg-white/8 px-2 py-1 rounded">
            /api/users/details
          </code>{" "}
          (shared cache with /users)
        </p>
      </div>
    </main>
  );
}
