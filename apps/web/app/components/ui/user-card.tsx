"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { User, ExtraDetails } from "@/lib/types";

type CardVariant = "default" | "compact" | "leadership";
type AccentColor = "neutral" | "warm" | "cool" | "gray" | "white";

const colorStyles: Record<
  AccentColor,
  {
    card: string;
    role: string;
    avatar: string;
    hover: string;
  }
> = {
  neutral: {
    card: "bg-card border-border",
    role: "text-foreground/80",
    avatar: "from-muted to-muted-foreground/20",
    hover: "hover:border-foreground/30 hover:shadow-md",
  },
  warm: {
    card: "bg-card border-border",
    role: "text-foreground/80",
    avatar: "from-muted to-muted-foreground/20",
    hover: "hover:border-foreground/30 hover:shadow-md",
  },
  cool: {
    card: "bg-card border-border",
    role: "text-foreground/80",
    avatar: "from-muted to-muted-foreground/20",
    hover: "hover:border-foreground/30 hover:shadow-md",
  },
  gray: {
    card: "bg-card border-border",
    role: "text-foreground/80",
    avatar: "from-muted to-muted-foreground/20",
    hover: "hover:border-foreground/30 hover:shadow-md",
  },
  white: {
    card: "bg-card border-border",
    role: "text-foreground/80",
    avatar: "from-muted to-muted-foreground/20",
    hover: "hover:border-foreground/30 hover:shadow-md",
  },
};

export function UserAge({ details }: { details: ExtraDetails | null }) {
  if (!details) {
    return <Skeleton className="w-6 h-3 bg-muted" />;
  }

  return (
    <Badge
      variant="secondary"
      className="bg-muted text-foreground border-border text-[10px] px-1.5 py-0 h-auto animate-fadeIn"
    >
      {details.age} yrs
    </Badge>
  );
}

export function UserLocation({ details }: { details: ExtraDetails | null }) {
  if (!details) {
    return <Skeleton className="w-16 h-3 bg-muted" />;
  }

  return (
    <span className="inline-flex items-center text-xs text-muted-foreground animate-fadeIn">
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
  accentColor = "neutral",
  showEmail = true,
  showId = true,
}: UserCardProps) {
  const styles = colorStyles[accentColor];

  if (variant === "leadership") {
    return (
      <Card
        className={`${styles.card} py-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 ${styles.hover}`}
      >
        <CardContent className="p-0 flex flex-col items-center">
          <div className="mb-3 relative">
            <Image
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              width={64}
              height={64}
              unoptimized
              className={`w-16 h-16 rounded-full bg-linear-to-br ${styles.avatar} ring-2 ring-border`}
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-[10px]">
              ⭐
            </span>
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-0.5">
            {user.name}
          </h3>
          <p className={`text-xs ${styles.role} font-medium mb-2`}>
            {user.role}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <UserAge details={details} />
            <span className="text-muted-foreground">•</span>
            <UserLocation details={details} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card
        className={`${styles.card} py-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 ${styles.hover}`}
      >
        <CardContent className="p-0 flex flex-col items-center w-full">
          <div className="mb-3">
            <Image
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              width={56}
              height={56}
              unoptimized
              className={`w-14 h-14 rounded-full bg-linear-to-br ${styles.avatar} ring-2 ring-border`}
            />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-0.5 truncate w-full px-2">
            {user.name.split(" ")[0]}
          </h3>
          <p
            className={`text-[10px] ${styles.role} font-medium mb-2 truncate w-full px-2`}
          >
            {user.role}
          </p>
          <div className="flex flex-col items-center gap-1 text-[10px]">
            <UserAge details={details} />
            <UserLocation details={details} />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default horizontal layout
  return (
    <Card
      className={`${styles.card} py-4 transition-all duration-300 hover:-translate-y-0.5 ${styles.hover}`}
    >
      <CardContent className="p-0 px-4 flex items-start gap-3">
        <div className="shrink-0">
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={48}
            height={48}
            unoptimized
            className={`w-12 h-12 rounded-lg bg-muted border border-border`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-base font-semibold text-foreground">
              {user.name}
            </h2>
            <UserAge details={details} />
          </div>
          <p className={`text-xs ${styles.role} font-medium mb-1`}>
            {user.role}
          </p>
          {showEmail && (
            <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap mb-1">
              {user.email}
            </p>
          )}
          <UserLocation details={details} />
        </div>
        {showId && (
          <Badge
            variant="outline"
            className="text-xs font-mono text-muted-foreground"
          >
            #{user.id}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
