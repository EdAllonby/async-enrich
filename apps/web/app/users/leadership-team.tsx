import { UserDetailsLoader } from "./user-extra-details";
import { LeadershipCard } from "./leadership-card";
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
    <UserDetailsLoader userIds={leaderIds}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {leaders.map((user) => (
          <LeadershipCard key={user.id} user={user} />
        ))}
      </div>
    </UserDetailsLoader>
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
