"use client";

import { useEffect, useState } from "react";

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

// Store for extra details - shared across all instances
const detailsCache = new Map<number, ExtraDetails>();

export function UserExtraDetailsProvider({ userIds }: UserExtraDetailsProps) {
  const [, setLoaded] = useState(false);

  useEffect(() => {
    // Only fetch IDs we don't already have
    const idsToFetch = userIds.filter((id) => !detailsCache.has(id));

    if (idsToFetch.length === 0) {
      setLoaded(true);
      return;
    }

    const fetchDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/users/details",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userIds: idsToFetch }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch extra details");

        const result = await response.json();

        // Cache the results
        for (const detail of result.data as ExtraDetails[]) {
          detailsCache.set(detail.userId, detail);
        }

        // Trigger re-render
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching extra details:", error);
      }
    };

    fetchDetails();
  }, [userIds]);

  return null; // This component just manages the fetch
}

interface UserAgeProps {
  userId: number;
}

export function UserAge({ userId }: UserAgeProps) {
  const [details, setDetails] = useState<ExtraDetails | null>(
    detailsCache.get(userId) ?? null
  );

  useEffect(() => {
    // Check cache on mount and set up polling for updates
    const checkCache = () => {
      const cached = detailsCache.get(userId);
      if (cached && !details) {
        setDetails(cached);
      }
    };

    checkCache();

    // Poll for cache updates (in case fetch completes after mount)
    const interval = setInterval(checkCache, 100);

    // Clean up after 5 seconds (details should be loaded by then)
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [userId, details]);

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

export function UserLocation({ userId }: UserAgeProps) {
  const [details, setDetails] = useState<ExtraDetails | null>(
    detailsCache.get(userId) ?? null
  );

  useEffect(() => {
    const checkCache = () => {
      const cached = detailsCache.get(userId);
      if (cached && !details) {
        setDetails(cached);
      }
    };

    checkCache();
    const interval = setInterval(checkCache, 100);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [userId, details]);

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
