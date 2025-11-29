import { env } from "@/lib/env";
import type { LeadershipResponse } from "@/lib/types";
import { UserDetailsLoader } from "@/lib/user-details";
import { UserCardWrapper } from "@/components/ui/user-card-wrapper";
import { LeadershipSkeleton } from "@/components/ui/card-grid-skeleton";

export async function LeadershipTeam() {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/users/leadership`, {
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
      <div className="flex justify-center gap-4 flex-wrap max-w-3xl mx-auto">
        {leaders.map((leader) => (
          <div key={leader.id} className="w-44">
            <UserCardWrapper
              user={leader}
              variant="leadership"
              accentColor="amber"
              showEmail={false}
              showId={false}
            />
          </div>
        ))}
      </div>
    </UserDetailsLoader>
  );
}

export function LeadershipLoading() {
  return <LeadershipSkeleton count={4} />;
}
