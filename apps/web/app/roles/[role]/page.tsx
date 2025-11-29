import { Suspense } from "react";
import Link from "next/link";
import { RoleUsersList, RoleUsersLoading } from "./role-users-list";
import { getRoleConfig, formatRoleName } from "../../lib/roles";
import { notFound } from "next/navigation";

export default async function RolePage({
  params,
  searchParams,
}: {
  params: Promise<{ role: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { role: encodedRole } = await params;
  const role = decodeURIComponent(encodedRole);
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));

  const config = getRoleConfig(role);
  if (!config) {
    notFound();
  }

  const displayRole = formatRoleName(role);

  return (
    <main
      className={`min-h-screen py-12 px-6 bg-linear-to-br ${config.bgGradient} font-sans`}
    >
      <div className="text-center mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1
          className={`text-4xl font-bold bg-linear-to-r ${config.gradient} bg-clip-text text-transparent mb-3 tracking-tight`}
        >
          {config.emoji} {displayRole}s
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto mb-4 leading-relaxed">
          All team members with the{" "}
          <span className={`text-${config.color}-400`}>{displayRole}</span> role
        </p>
        <div
          className={`inline-flex items-center gap-2 bg-${config.color}-500/15 border border-${config.color}-500/30 text-${config.color}-400 px-3 py-1.5 rounded-full text-xs font-medium`}
        >
          <span
            className={`w-1.5 h-1.5 bg-${config.color}-400 rounded-full animate-pulse`}
          />
          Shared React Query Cache
        </div>
      </div>

      <section>
        <Suspense fallback={<RoleUsersLoading />}>
          <RoleUsersList role={role} page={page} />
        </Suspense>
      </section>

      <div className="text-center mt-10 text-gray-500 text-xs">
        <p>
          Data from{" "}
          <code className="font-mono bg-white/8 px-2 py-1 rounded">
            /api/users/role/{encodeURIComponent(role)}
          </code>
        </p>
      </div>
    </main>
  );
}
