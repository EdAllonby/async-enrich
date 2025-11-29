import { UserDetailsLoader } from "../users/user-extra-details";
import { RandomUserCard } from "./random-user-card";
import type { User } from "../users/types";

interface RandomUsersResponse {
  success: boolean;
  data: User[];
}

export async function RandomUsersList() {
  const response = await fetch(
    "http://localhost:3001/api/users/random?count=10",
    { cache: "no-store" }
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
          <RandomUserCard key={user.id} user={user} />
        ))}
      </div>
    </UserDetailsLoader>
  );
}

export function RandomUsersLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center animate-pulse"
        >
          <div className="w-14 h-14 rounded-full bg-white/10 mb-3" />
          <div className="h-3 bg-white/10 rounded w-20 mb-2" />
          <div className="h-2 bg-white/10 rounded w-16" />
        </div>
      ))}
    </div>
  );
}

