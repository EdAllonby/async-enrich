import { Suspense } from "react";
import Link from "next/link";
import { PageNav } from "@/components/page-nav";
import { Badge } from "@/components/ui/badge";
import { DevelopersList, DevelopersLoading } from "./developers-list";

export default async function DevelopersPage({
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
            Developer Directory
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Our engineering talent. Extra details like age and location are
            shared across pages.
          </p>
          <Badge
            variant="outline"
            className="bg-muted/50 border-border text-foreground px-4 py-2"
          >
            Shared React Query Cache
          </Badge>
        </div>

        <PageNav current="developers" />

        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-3">
              Engineering Team
            </h2>
            <p className="text-muted-foreground">
              Frontend, Backend, Full Stack, and DevOps engineers
            </p>
          </div>
          <Suspense fallback={<DevelopersLoading />}>
            <DevelopersList searchParams={searchParams} />
          </Suspense>
        </section>

        <div className="text-center mt-16 text-muted-foreground text-sm">
          <p>
            Data from{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded border border-border">
              /api/users/developers
            </code>
            <br />
            Extra details from{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded border border-border">
              /api/users/details
            </code>{" "}
            (shared cache with /users)
          </p>
        </div>
      </div>
    </main>
  );
}
