"use client";

import { useUserDetailsFromCache } from "@/lib/user-details";
import { UserCard } from "./user-card";
import type { User } from "@/lib/types";

type CardVariant = "default" | "compact" | "leadership";
type AccentColor =
  | "neutral"
  | "warm"
  | "cool"
  | "gray"
  | "white";

interface UserCardWrapperProps {
  user: User;
  variant?: CardVariant;
  accentColor?: AccentColor;
  showEmail?: boolean;
  showId?: boolean;
}

export function UserCardWrapper({
  user,
  variant = "default",
  accentColor = "neutral",
  showEmail = true,
  showId = true,
}: UserCardWrapperProps) {
  const details = useUserDetailsFromCache(user.id);

  return (
    <UserCard
      user={user}
      details={details}
      variant={variant}
      accentColor={accentColor}
      showEmail={showEmail}
      showId={showId}
    />
  );
}

