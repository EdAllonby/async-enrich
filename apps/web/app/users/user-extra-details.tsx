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

interface UserExtraDetailsProps {
  userIds: number[];
}

// Query key factory
const userDetailsKeys = {
  all: ["userDetails"] as const,
  batch: (ids: number[]) => [...userDetailsKeys.all, "batch", ids] as const,
};

// Fetch function for user details
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

// Provider component that triggers the batch fetch and populates cache
export function UserExtraDetailsProvider({ userIds }: UserExtraDetailsProps) {
  const queryClient = useQueryClient();

  // Batch fetch all user details
  const { data } = useQuery({
    queryKey: userDetailsKeys.batch(userIds),
    queryFn: () => fetchUserDetails(userIds),
    staleTime: 5 * 60 * 1000,
  });

  // When data arrives, populate individual user caches for faster lookups
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

// Hook to get details for a single user
function useUserDetails(userId: number) {
  return useQuery({
    queryKey: [...userDetailsKeys.all, userId],
    queryFn: () => fetchUserDetails([userId]).then((data) => data[0]),
    staleTime: 5 * 60 * 1000,
  });
}

interface UserDetailProps {
  userId: number;
}

export function UserAge({ userId }: UserDetailProps) {
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

export function UserLocation({ userId }: UserDetailProps) {
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
