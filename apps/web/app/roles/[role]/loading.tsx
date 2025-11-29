import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CardGridSkeleton } from "@/components/ui/card-grid-skeleton";

export default function RolePageLoading() {
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
          <Skeleton className="h-12 w-80 mx-auto mb-4 bg-muted" />
          <Skeleton className="h-6 w-96 mx-auto mb-6 bg-muted" />
          <Skeleton className="h-8 w-48 mx-auto bg-muted rounded-full" />
        </div>

        <section>
          <CardGridSkeleton count={10} columns={2} variant="default" />
        </section>

        <div className="text-center mt-16">
          <Skeleton className="h-4 w-96 mx-auto bg-muted" />
        </div>
      </div>
    </main>
  );
}
