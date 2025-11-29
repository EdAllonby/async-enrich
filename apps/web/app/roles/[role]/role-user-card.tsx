"use client";

import Image from "next/image";
import {
  UserAge,
  UserLocation,
  useUserDetailsFromCache,
} from "../../users/user-extra-details";
import type { User } from "../../users/types";

export function RoleUserCard({ user }: { user: User }) {
  const details = useUserDetailsFromCache(user.id);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
      <div className="shrink-0">
        <Image
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          width={48}
          height={48}
          unoptimized
          className="w-12 h-12 rounded-lg bg-linear-to-br from-gray-500 to-gray-600"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h2 className="text-base font-semibold text-gray-50">{user.name}</h2>
          <UserAge details={details} />
        </div>
        <p className="text-xs text-gray-400 font-medium mb-1">{user.role}</p>
        <p className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap mb-1">
          {user.email}
        </p>
        <UserLocation details={details} />
      </div>
      <div className="text-xs text-gray-500 font-mono">#{user.id}</div>
    </div>
  );
}
