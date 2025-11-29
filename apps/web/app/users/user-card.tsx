"use client";

import {
  UserAge,
  UserLocation,
  useUserDetailsFromCache,
} from "./user-extra-details";
import type { User } from "./types";

export function UserCard({ user }: { user: User }) {
  const details = useUserDetailsFromCache(user.id);

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 flex items-start gap-3 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 hover:border-indigo-400/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="shrink-0">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h2 className="text-base font-semibold text-gray-50">{user.name}</h2>
          <UserAge details={details} />
        </div>
        <p className="text-xs text-indigo-400 font-medium mb-1">{user.role}</p>
        <p className="text-xs text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap mb-1">
          {user.email}
        </p>
        <UserLocation details={details} />
      </div>
      <div className="text-xs text-gray-500 font-mono">#{user.id}</div>
    </div>
  );
}
