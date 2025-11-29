import { Suspense } from "react";
import styles from "./page.module.css";

// Type definitions for our API response
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
}

interface UsersResponse {
  success: boolean;
  data: User[];
  total: number;
}

// This is an async Server Component that fetches data on the server
async function UsersList() {
  // Fetch data from our Express API (running on port 3001)
  const response = await fetch("http://localhost:3001/api/users", {
    // Disable caching to always get fresh data in development
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: UsersResponse = await response.json();

  return (
    <div className={styles.grid}>
      {result.data.map((user) => (
        <div key={user.id} className={styles.card}>
          <div className={styles.avatarWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className={styles.avatar}
            />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userRole}>{user.role}</p>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userDate}>
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Loading skeleton for Suspense fallback
function UsersLoading() {
  return (
    <div className={styles.grid}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`${styles.card} ${styles.skeleton}`}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarSkeleton} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.textSkeleton} style={{ width: "70%" }} />
            <div className={styles.textSkeleton} style={{ width: "50%" }} />
            <div className={styles.textSkeleton} style={{ width: "80%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Main page component - this is also a Server Component
export default function UsersPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Team Directory</h1>
        <p className={styles.subtitle}>
          This page demonstrates a React Server Component (RSC) that
          asynchronously fetches data from our Express.js mock API.
        </p>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Server Component
        </div>
      </div>

      <Suspense fallback={<UsersLoading />}>
        <UsersList />
      </Suspense>

      <div className={styles.footer}>
        <p>
          Data fetched server-side from{" "}
          <code className={styles.code}>http://localhost:3001/api/users</code>
        </p>
      </div>
    </main>
  );
}

