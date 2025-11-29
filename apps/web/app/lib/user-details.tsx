"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { API_BASE_URL } from "./config";
import type { ExtraDetails } from "./types";

async function fetchUserDetails(userIds: number[]): Promise<ExtraDetails[]> {
  const response = await fetch(`${API_BASE_URL}/api/users/details`, {
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

