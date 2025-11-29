"use client";

import {
  UserAge,
  UserLocation,
  useUserDetailsFromCache,
} from "./user-extra-details";
import type { User } from "./types";

export function LeadershipCard({ user }: { user: User }) {
  const details = useUserDetailsFromCache(user.id);

  return (
    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]">
      <div className="mb-3 relative">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 ring-2 ring-amber-500/30"
        />
        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-[10px]">
          ⭐
        </span>
      </div>
      <h3 className="text-sm font-semibold text-gray-50 mb-0.5">{user.name}</h3>
      <p className="text-xs text-amber-400 font-medium mb-2">{user.role}</p>
      <div className="flex items-center gap-2 text-xs">
        <UserAge details={details} />
        <span className="text-gray-600">•</span>
        <UserLocation details={details} />
      </div>
    </div>
  );
}
