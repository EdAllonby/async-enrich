"use client";

import Image from "next/image";
import {
  UserAge,
  UserLocation,
  useUserDetailsFromCache,
} from "../users/user-extra-details";
import type { User } from "../users/types";

export function RandomUserCard({ user }: { user: User }) {
  const details = useUserDetailsFromCache(user.id);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]">
      <div className="mb-3">
        <Image
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          width={56}
          height={56}
          unoptimized
          className="w-14 h-14 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 ring-2 ring-purple-500/30"
        />
      </div>
      <h3 className="text-sm font-semibold text-gray-50 mb-0.5 truncate w-full">
        {user.name.split(" ")[0]}
      </h3>
      <p className="text-[10px] text-purple-400 font-medium mb-2 truncate w-full">
        {user.role}
      </p>
      <div className="flex flex-col items-center gap-1 text-[10px]">
        <UserAge details={details} />
        <UserLocation details={details} />
      </div>
    </div>
  );
}

