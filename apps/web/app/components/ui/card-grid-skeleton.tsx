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
    <div
      className={`bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3 animate-pulse ${className}`}
    >
      <div className="shrink-0">
        <div className="w-12 h-12 rounded-lg bg-white/10" />
      </div>
      <div className="flex-1">
        <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
        <div className="h-3 bg-white/10 rounded w-1/2 mb-2" />
        <div className="h-3 bg-white/10 rounded w-4/5" />
      </div>
    </div>
  );
}

function CompactCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center animate-pulse ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-white/10 mb-3" />
      <div className="h-3 bg-white/10 rounded w-20 mb-2" />
      <div className="h-2 bg-white/10 rounded w-16" />
    </div>
  );
}

function LeadershipCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex flex-col items-center animate-pulse ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-white/10 mb-3" />
      <div className="h-3 bg-white/10 rounded w-24 mb-2" />
      <div className="h-2 bg-white/10 rounded w-20 mb-2" />
      <div className="h-2 bg-white/10 rounded w-28" />
    </div>
  );
}

export function CardGridSkeleton({
  count = 10,
  columns = 2,
  variant = "default",
  showPagination = true,
  cardClassName,
}: CardGridSkeletonProps) {
  const gridCols = columns === 5 ? "grid-cols-2 md:grid-cols-5" : "grid-cols-1 md:grid-cols-2";
  
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
          <div className="h-10 bg-white/10 rounded-lg w-64 animate-pulse" />
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

