import { env } from "../lib/env";
import type { UsersResponse } from "../lib/types";
import { UserDetailsLoader } from "../lib/user-details";
import { UserCardWrapper } from "../components/ui/user-card-wrapper";
import { Pagination } from "../components/ui/pagination";
import { CardGridSkeleton } from "../components/ui/card-grid-skeleton";

export async function DevelopersList({ page }: { page: number }) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/users/developers?page=${page}&pageSize=10`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch developers");
  }

  const result: UsersResponse = await response.json();
  const { data: developers, pagination } = result;

  const developerIds = developers.map((u) => u.id);

  return (
    <UserDetailsLoader userIds={developerIds}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {developers.map((developer) => (
          <UserCardWrapper
            key={developer.id}
            user={developer}
            accentColor="emerald"
          />
        ))}
      </div>
      <Pagination
        pagination={pagination}
        baseUrl="/developers"
        accentColor="emerald"
        label="developers"
      />
    </UserDetailsLoader>
  );
}

export function DevelopersLoading() {
  return (
    <CardGridSkeleton
      count={10}
      columns={2}
      variant="default"
      cardClassName="bg-emerald-500/5 border-emerald-500/10"
    />
  );
}
