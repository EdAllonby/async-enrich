import { Suspense } from "react";
import Link from "next/link";
import { RoleUsersList, RoleUsersLoading } from "./role-users-list";
import { notFound } from "next/navigation";

const roleConfig: Record<
  string,
  { emoji: string; color: string; gradient: string; bgGradient: string }
> = {
  developer: {
    emoji: "👨‍💻",
    color: "indigo",
    gradient: "from-indigo-400 to-blue-500",
    bgGradient: "from-[#0f0f23] via-[#1a1a2e] to-[#16213e]",
  },
  designer: {
    emoji: "🎨",
    color: "pink",
    gradient: "from-pink-400 to-rose-500",
    bgGradient: "from-[#230f1a] via-[#2e1a24] to-[#3e1629]",
  },
  "product manager": {
    emoji: "📊",
    color: "amber",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-[#231a0f] via-[#2e241a] to-[#3e2916]",
  },
  "devops engineer": {
    emoji: "🔧",
    color: "cyan",
    gradient: "from-cyan-400 to-teal-500",
    bgGradient: "from-[#0f1f23] via-[#1a2a2e] to-[#16333e]",
  },
  "qa engineer": {
    emoji: "🔍",
    color: "violet",
    gradient: "from-violet-400 to-purple-500",
    bgGradient: "from-[#1a0f23] via-[#241a2e] to-[#29163e]",
  },
  "data scientist": {
    emoji: "📈",
    color: "emerald",
    gradient: "from-emerald-400 to-green-500",
    bgGradient: "from-[#0f1f0f] via-[#1a2e1a] to-[#163e16]",
  },
  "frontend engineer": {
    emoji: "🖥️",
    color: "sky",
    gradient: "from-sky-400 to-blue-500",
    bgGradient: "from-[#0f1923] via-[#1a242e] to-[#16293e]",
  },
  "backend engineer": {
    emoji: "⚙️",
    color: "slate",
    gradient: "from-slate-400 to-gray-500",
    bgGradient: "from-[#14141f] via-[#1f1f2a] to-[#1a1a35]",
  },
  "full stack developer": {
    emoji: "🚀",
    color: "orange",
    gradient: "from-orange-400 to-red-500",
    bgGradient: "from-[#231410] via-[#2e1f1a] to-[#3e2216]",
  },
  "engineering manager": {
    emoji: "👔",
    color: "yellow",
    gradient: "from-yellow-400 to-amber-500",
    bgGradient: "from-[#23200f] via-[#2e2a1a] to-[#3e3316]",
  },
};

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

  const config = roleConfig[role.toLowerCase()];
  if (!config) {
    notFound();
  }

  const displayRole = role
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

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
