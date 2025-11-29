import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Pagination as PaginationType } from "@/lib/types";

type AccentColor = "indigo" | "emerald" | "white";

const colorStyles: Record<
  AccentColor,
  {
    text: string;
    active: string;
  }
> = {
  indigo: {
    text: "text-indigo-400",
    active: "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30",
  },
  emerald: {
    text: "text-emerald-400",
    active: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30",
  },
  white: {
    text: "text-white",
    active: "bg-white/20 text-white shadow-lg",
  },
};

interface PaginationProps {
  pagination: PaginationType;
  baseUrl: string;
  accentColor?: AccentColor;
  label?: string;
}

export function Pagination({
  pagination,
  baseUrl,
  accentColor = "indigo",
  label = "items",
}: PaginationProps) {
  const { currentPage, totalPages, totalItems, hasNextPage, hasPrevPage } =
    pagination;
  const styles = colorStyles[accentColor];

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const buildUrl = (page: number) => {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}page=${page}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
      <p className="text-sm text-muted-foreground">
        Showing page{" "}
        <span className={`${styles.text} font-semibold`}>{currentPage}</span> of{" "}
        <span className={`${styles.text} font-semibold`}>{totalPages}</span>
        <span className="text-muted-foreground/70 ml-2">
          ({totalItems} {label})
        </span>
      </p>

      <nav className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/5 border-white/10 text-foreground hover:bg-white/10"
          disabled={!hasPrevPage}
          asChild={hasPrevPage}
        >
          {hasPrevPage ? (
            <Link href={buildUrl(currentPage - 1)}>← Prev</Link>
          ) : (
            <span>← Prev</span>
          )}
        </Button>

        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((pageNum, idx) =>
            pageNum === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 py-2 text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size="icon"
                className={
                  pageNum === currentPage
                    ? styles.active
                    : "bg-white/5 border-white/10 text-foreground hover:bg-white/10"
                }
                asChild
              >
                <Link href={buildUrl(pageNum)}>{pageNum}</Link>
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="bg-white/5 border-white/10 text-foreground hover:bg-white/10"
          disabled={!hasNextPage}
          asChild={hasNextPage}
        >
          {hasNextPage ? (
            <Link href={buildUrl(currentPage + 1)}>Next →</Link>
          ) : (
            <span>Next →</span>
          )}
        </Button>
      </nav>
    </div>
  );
}
