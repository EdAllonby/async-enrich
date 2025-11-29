import { Suspense } from "react";
import Link from "next/link";
import { PageNav } from "@/components/page-nav";
import { Badge } from "@/components/ui/badge";
import { LeadershipTeam, LeadershipLoading } from "./leadership-team";
import { UsersList, UsersLoading } from "./users-list";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <main className="min-h-screen py-16 px-6 bg-background font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
            Team Directory
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Users load instantly, then age and location are adorned
            asynchronously.
          </p>
          <Badge
            variant="outline"
            className="bg-muted/50 border-border text-foreground px-4 py-2"
          >
            RSC + Shared React Query Cache
          </Badge>
        </div>

        <PageNav current="users" />

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-3">
              Leadership Team
            </h2>
            <p className="text-muted-foreground">
              Our managers and product leaders
            </p>
          </div>
          <Suspense fallback={<LeadershipLoading />}>
            <LeadershipTeam />
          </Suspense>
        </section>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="h-px bg-border" />
        </div>

        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-3">
              All Team Members
            </h2>
            <p className="text-muted-foreground">
              Browse our full team directory
            </p>
          </div>
          <Suspense fallback={<UsersLoading />}>
            <UsersList searchParams={searchParams} />
          </Suspense>
        </section>

        <div className="text-center mt-16 text-muted-foreground text-sm">
          <p>
            Initial data from{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded border border-border">
              /api/users
            </code>{" "}
            +{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded border border-border">
              /api/users/leadership
            </code>
            <br />
            Extra details from{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded border border-border">
              /api/users/details
            </code>{" "}
            (shared cache)
          </p>
        </div>
      </div>
    </main>
  );
}
