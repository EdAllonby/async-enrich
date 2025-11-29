"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface ExtraDetails {
  userId: number;
  age: number;
  department: string;
  location: string;
  yearsAtCompany: number;
}

const userDetailsKeys = {
  all: ["userDetails"] as const,
  batch: (ids: number[]) => [...userDetailsKeys.all, "batch", ids] as const,
};

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

export function UserExtraDetailsProvider({ userIds }: { userIds: number[] }) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: userDetailsKeys.batch(userIds),
    queryFn: () => fetchUserDetails(userIds),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      for (const detail of data) {
        queryClient.setQueryData(
          [...userDetailsKeys.all, detail.userId],
          detail
        );
      }
    }
  }, [data, queryClient]);

  return null;
}

function useUserDetails(userId: number) {
  return useQuery({
    queryKey: [...userDetailsKeys.all, userId],
    queryFn: () => fetchUserDetails([userId]).then((data) => data[0]),
    staleTime: 5 * 60 * 1000,
  });
}

export function UserAge({ userId }: { userId: number }) {
  const { data: details, isLoading } = useUserDetails(userId);

  if (isLoading || !details) {
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

export function UserLocation({ userId }: { userId: number }) {
  const { data: details, isLoading } = useUserDetails(userId);

  if (isLoading || !details) {
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
