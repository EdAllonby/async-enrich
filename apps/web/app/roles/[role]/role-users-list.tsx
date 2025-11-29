import { env } from "@/lib/env";
import type { RoleUsersResponse } from "@/lib/types";
import { UserDetailsLoader } from "@/lib/user-details";
import { UserCardWrapper } from "@/components/ui/user-card-wrapper";
import { Pagination } from "@/components/ui/pagination";
import { CardGridSkeleton } from "@/components/ui/card-grid-skeleton";

export async function RoleUsersList({
  role,
  page,
}: {
  role: string;
  page: number;
}) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/users/role/${encodeURIComponent(role)}?page=${page}&pageSize=10`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${role}s`);
  }

  const result: RoleUsersResponse = await response.json();
  const { data: users, pagination } = result;

  const userIds = users.map((u) => u.id);

  return (
    <UserDetailsLoader userIds={userIds}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {users.map((user) => (
          <UserCardWrapper key={user.id} user={user} accentColor="gray" />
        ))}
      </div>
      <Pagination
        pagination={pagination}
        baseUrl={`/roles/${encodeURIComponent(role)}`}
        accentColor="white"
        label="total"
      />
    </UserDetailsLoader>
  );
}

export function RoleUsersLoading() {
  return <CardGridSkeleton count={10} columns={2} variant="default" />;
}
