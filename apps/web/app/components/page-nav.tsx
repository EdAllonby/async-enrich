import Link from "next/link";

export function PageNav({ current }: { current: "users" | "developers" }) {
  return (
    <nav className="flex justify-center gap-2 mb-8">
      <Link
        href="/users"
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          current === "users"
            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
            : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-indigo-400/50"
        }`}
      >
        👥 All Users
      </Link>
      <Link
        href="/developers"
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          current === "developers"
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
            : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-emerald-400/50"
        }`}
      >
        💻 Developers
      </Link>
    </nav>
  );
}

