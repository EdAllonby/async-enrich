import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type SkeletonVariant = "default" | "compact" | "leadership";

interface CardGridSkeletonProps {
  count?: number;
  columns?: 2 | 5;
  variant?: SkeletonVariant;
  showPagination?: boolean;
  cardClassName?: string;
}

function DefaultCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={`bg-white/5 border-white/10 py-4 ${className}`}>
      <CardContent className="p-0 px-4 flex items-start gap-3">
        <Skeleton className="w-12 h-12 rounded-lg bg-white/10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 bg-white/10" />
          <Skeleton className="h-3 w-1/2 bg-white/10" />
          <Skeleton className="h-3 w-4/5 bg-white/10" />
        </div>
      </CardContent>
    </Card>
  );
}

function CompactCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={`bg-white/5 border-white/10 py-4 ${className}`}>
      <CardContent className="p-0 flex flex-col items-center">
        <Skeleton className="w-14 h-14 rounded-full bg-white/10 mb-3" />
        <Skeleton className="h-3 w-20 bg-white/10 mb-2" />
        <Skeleton className="h-2 w-16 bg-white/10" />
      </CardContent>
    </Card>
  );
}

function LeadershipCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={`bg-amber-500/5 border-amber-500/10 py-4 ${className}`}>
      <CardContent className="p-0 flex flex-col items-center">
        <Skeleton className="w-16 h-16 rounded-full bg-white/10 mb-3" />
        <Skeleton className="h-3 w-24 bg-white/10 mb-2" />
        <Skeleton className="h-2 w-20 bg-white/10 mb-2" />
        <Skeleton className="h-2 w-28 bg-white/10" />
      </CardContent>
    </Card>
  );
}

export function CardGridSkeleton({
  count = 10,
  columns = 2,
  variant = "default",
  showPagination = true,
  cardClassName,
}: CardGridSkeletonProps) {
  const gridCols =
    columns === 5 ? "grid-cols-2 md:grid-cols-5" : "grid-cols-1 md:grid-cols-2";

  const CardComponent =
    variant === "compact"
      ? CompactCardSkeleton
      : variant === "leadership"
        ? LeadershipCardSkeleton
        : DefaultCardSkeleton;

  return (
    <>
      <div className={`grid ${gridCols} gap-4 max-w-4xl mx-auto mb-8`}>
        {Array.from({ length: count }).map((_, i) => (
          <CardComponent key={i} className={cardClassName} />
        ))}
      </div>
      {showPagination && (
        <div className="flex justify-center">
          <Skeleton className="h-10 w-64 bg-white/10" />
        </div>
      )}
    </>
  );
}

export function LeadershipSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex justify-center gap-4 flex-wrap max-w-3xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <LeadershipCardSkeleton key={i} className="w-44" />
      ))}
    </div>
  );
}
