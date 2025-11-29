"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";

export interface ExtraDetails {
  userId: number;
  age: number;
  department: string;
  location: string;
  yearsAtCompany: number;
}

async function fetchUserDetails(userIds: number[]): Promise<ExtraDetails[]> {
  const response = await fetch("http://localhost:3001/api/users/details", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userIds }),
  });

  if (!response.ok) throw new Error("Failed to fetch extra details");

  const result = await response.json();
  return result.data;
}

function useBatchUserDetails(userIds: number[]) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["userDetails", "batch", userIds],
    queryFn: () => fetchUserDetails(userIds),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      for (const detail of query.data) {
        queryClient.setQueryData(["userDetails", detail.userId], detail);
      }
    }
  }, [query.data, queryClient]);

  return query;
}

export function UserDetailsLoader({
  userIds,
  children,
}: {
  userIds: number[];
  children: ReactNode;
}) {
  useBatchUserDetails(userIds);
  return children;
}

export function useUserDetailsFromCache(userId: number): ExtraDetails | null {
  const queryClient = useQueryClient();
  const queryKey = ["userDetails", userId];

  const getCachedData = () =>
    queryClient.getQueryData<ExtraDetails>(queryKey) ?? null;

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      forceUpdate({});
    });

    return unsubscribe;
  }, [queryClient]);

  return getCachedData();
}

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
