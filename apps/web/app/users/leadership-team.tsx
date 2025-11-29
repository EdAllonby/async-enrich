import { UserExtraDetailsProvider, UserAge, UserLocation } from "./user-extra-details";
import type { LeadershipResponse } from "./types";

export async function LeadershipTeam() {
  const response = await fetch("http://localhost:3001/api/users/leadership", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leadership team");
  }

  const result: LeadershipResponse = await response.json();
  const leaders = result.data;

  const leaderIds = leaders.map((u) => u.id);

  return (
    <>
      <UserExtraDetailsProvider userIds={leaderIds} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {leaders.map((user) => (
          <div
            key={user.id}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
          >
            <div className="mb-3 relative">
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 ring-2 ring-amber-500/30"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-[10px]">
                ⭐
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-50 mb-0.5">
              {user.name}
            </h3>
            <p className="text-xs text-amber-400 font-medium mb-2">
              {user.role}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <UserAge userId={user.id} />
              <span className="text-gray-600">•</span>
              <UserLocation userId={user.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function LeadershipLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10 rounded-xl p-4 flex flex-col items-center animate-pulse"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 mb-3" />
          <div className="h-4 bg-white/10 rounded w-24 mb-2" />
          <div className="h-3 bg-white/10 rounded w-20 mb-2" />
          <div className="h-3 bg-white/10 rounded w-28" />
        </div>
      ))}
    </div>
  );
}

