import { env } from "@/lib/env";
import type { UsersResponse } from "@/lib/types";
import { UserDetailsLoader } from "@/lib/user-details";
import { UserCardWrapper } from "@/components/ui/user-card-wrapper";
import { Pagination } from "@/components/ui/pagination";
import { CardGridSkeleton } from "@/components/ui/card-grid-skeleton";

export async function UsersList({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&pageSize=10`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: UsersResponse = await response.json();
  const { data: users, pagination } = result;

  const userIds = users.map((u) => u.id);

  return (
    <UserDetailsLoader userIds={userIds}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {users.map((user) => (
          <UserCardWrapper key={user.id} user={user} accentColor="neutral" />
        ))}
      </div>
      <Pagination
        pagination={pagination}
        baseUrl="/users"
        accentColor="neutral"
        label="users"
      />
    </UserDetailsLoader>
  );
}

export function UsersLoading() {
  return <CardGridSkeleton count={10} columns={2} variant="default" />;
}
