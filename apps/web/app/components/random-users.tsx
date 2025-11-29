import { env } from "@/lib/env";
import type { RandomUsersResponse } from "@/lib/types";
import { UserDetailsLoader } from "@/lib/user-details";
import { UserCardWrapper } from "@/components/ui/user-card-wrapper";
import { CardGridSkeleton } from "@/components/ui/card-grid-skeleton";

export async function RandomUsersList() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/users/random?count=10`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch random users");
  }

  const result: RandomUsersResponse = await response.json();
  const users = result.data;

  const userIds = users.map((u) => u.id);

  return (
    <UserDetailsLoader userIds={userIds}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {users.map((user) => (
          <UserCardWrapper
            key={user.id}
            user={user}
            variant="compact"
            accentColor="purple"
            showEmail={false}
            showId={false}
          />
        ))}
      </div>
    </UserDetailsLoader>
  );
}

export function RandomUsersLoading() {
  return (
    <CardGridSkeleton
      count={10}
      columns={5}
      variant="compact"
      showPagination={false}
    />
  );
}
