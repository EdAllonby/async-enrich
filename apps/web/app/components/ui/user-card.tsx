"use client";

import Image from "next/image";
import type { User, ExtraDetails } from "../../lib/types";

type CardVariant = "default" | "compact" | "leadership";
type AccentColor =
  | "indigo"
  | "emerald"
  | "amber"
  | "purple"
  | "gray"
  | "white";

const colorStyles: Record<
  AccentColor,
  {
    card: string;
    role: string;
    avatar: string;
    hover: string;
  }
> = {
  indigo: {
    card: "bg-white/3 border-white/8",
    role: "text-indigo-400",
    avatar: "from-indigo-500 to-purple-600",
    hover:
      "hover:border-indigo-400/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
  },
  emerald: {
    card: "bg-emerald-500/5 border-emerald-500/20",
    role: "text-emerald-400",
    avatar: "from-emerald-500 to-teal-600",
    hover:
      "hover:border-emerald-400/40 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]",
  },
  amber: {
    card: "bg-linear-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20",
    role: "text-amber-400",
    avatar: "from-amber-500 to-orange-600",
    hover:
      "hover:border-amber-400/40 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]",
  },
  purple: {
    card: "bg-white/5 border-white/10",
    role: "text-purple-400",
    avatar: "from-purple-500 to-indigo-600",
    hover:
      "hover:border-purple-400/40 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]",
  },
  gray: {
    card: "bg-white/5 border-white/10",
    role: "text-gray-400",
    avatar: "from-gray-500 to-gray-600",
    hover:
      "hover:border-white/30 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]",
  },
  white: {
    card: "bg-white/5 border-white/10",
    role: "text-gray-400",
    avatar: "from-gray-500 to-gray-600",
    hover:
      "hover:border-white/30 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]",
  },
};

export function UserAge({ details }: { details: ExtraDetails | null }) {
  if (!details) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
        <span className="w-6 h-3 bg-white/10 rounded animate-pulse" />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium animate-fadeIn">
      {details.age} yrs
    </span>
  );
}

export function UserLocation({ details }: { details: ExtraDetails | null }) {
  if (!details) {
    return (
      <span className="inline-flex items-center text-xs text-gray-500">
        <span className="w-16 h-3 bg-white/10 rounded animate-pulse" />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center text-xs text-gray-400 animate-fadeIn">
      📍 {details.location}
    </span>
  );
}

interface UserCardProps {
  user: User;
  details: ExtraDetails | null;
  variant?: CardVariant;
  accentColor?: AccentColor;
  showEmail?: boolean;
  showId?: boolean;
}

export function UserCard({
  user,
  details,
  variant = "default",
  accentColor = "indigo",
  showEmail = true,
  showId = true,
}: UserCardProps) {
  const styles = colorStyles[accentColor];

  if (variant === "leadership") {
    return (
      <div
        className={`${styles.card} rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 ${styles.hover}`}
      >
        <div className="mb-3 relative">
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={64}
            height={64}
            unoptimized
            className={`w-16 h-16 rounded-full bg-linear-to-br ${styles.avatar} ring-2 ring-amber-500/30`}
          />
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-[10px]">
            ⭐
          </span>
        </div>
        <h3 className="text-sm font-semibold text-gray-50 mb-0.5">
          {user.name}
        </h3>
        <p className={`text-xs ${styles.role} font-medium mb-2`}>{user.role}</p>
        <div className="flex items-center gap-2 text-xs">
          <UserAge details={details} />
          <span className="text-gray-600">•</span>
          <UserLocation details={details} />
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`${styles.card} rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 ${styles.hover}`}
      >
        <div className="mb-3">
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={56}
            height={56}
            unoptimized
            className={`w-14 h-14 rounded-full bg-linear-to-br ${styles.avatar} ring-2 ring-purple-500/30`}
          />
        </div>
        <h3 className="text-sm font-semibold text-gray-50 mb-0.5 truncate w-full">
          {user.name.split(" ")[0]}
        </h3>
        <p
          className={`text-[10px] ${styles.role} font-medium mb-2 truncate w-full`}
        >
          {user.role}
        </p>
        <div className="flex flex-col items-center gap-1 text-[10px]">
          <UserAge details={details} />
          <UserLocation details={details} />
        </div>
      </div>
    );
  }

  // Default horizontal layout
  return (
    <div
      className={`${styles.card} rounded-xl p-4 flex items-start gap-3 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 ${styles.hover}`}
    >
      <div className="shrink-0">
        <Image
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          width={48}
          height={48}
          unoptimized
          className={`w-12 h-12 rounded-lg bg-linear-to-br ${styles.avatar}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h2 className="text-base font-semibold text-gray-50">{user.name}</h2>
          <UserAge details={details} />
        </div>
        <p className={`text-xs ${styles.role} font-medium mb-1`}>{user.role}</p>
        {showEmail && (
          <p className="text-xs text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap mb-1">
            {user.email}
          </p>
        )}
        <UserLocation details={details} />
      </div>
      {showId && (
        <div className="text-xs text-gray-500 font-mono">#{user.id}</div>
      )}
    </div>
  );
}

