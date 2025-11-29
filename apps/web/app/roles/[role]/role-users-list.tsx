import { UserDetailsLoader } from "../../users/user-extra-details";
import { RoleUserCard } from "./role-user-card";
import { RolePagination } from "./role-pagination";
import type { UsersResponse } from "../../users/types";

interface RoleUsersResponse extends UsersResponse {
  role: string;
}

export async function RoleUsersList({
  role,
  page,
}: {
  role: string;
  page: number;
}) {
  const response = await fetch(
    `http://localhost:3001/api/users/role/${encodeURIComponent(role)}?page=${page}&pageSize=10`,
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
          <RoleUserCard key={user.id} user={user} />
        ))}
      </div>
      <RolePagination role={role} pagination={pagination} />
    </UserDetailsLoader>
  );
}

export function RoleUsersLoading() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3 animate-pulse"
          >
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-lg bg-white/10" />
            </div>
            <div className="flex-1">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2 mb-2" />
              <div className="h-3 bg-white/10 rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="h-10 bg-white/10 rounded-lg w-64 animate-pulse" />
      </div>
    </>
  );
}
