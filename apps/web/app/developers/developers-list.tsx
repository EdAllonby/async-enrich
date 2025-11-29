import { UserDetailsLoader } from "../users/user-extra-details";
import { DeveloperCard } from "./developer-card";
import { DeveloperPagination } from "./developer-pagination";
import type { UsersResponse } from "../users/types";

export async function DevelopersList({ page }: { page: number }) {
  const response = await fetch(
    `http://localhost:3001/api/users/developers?page=${page}&pageSize=10`,
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
          <DeveloperCard key={developer.id} user={developer} />
        ))}
      </div>
      <DeveloperPagination pagination={pagination} />
    </UserDetailsLoader>
  );
}

export function DevelopersLoading() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 flex items-start gap-3 animate-pulse"
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

