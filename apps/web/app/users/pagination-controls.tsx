import Link from "next/link";
import type { Pagination } from "./types";

export function PaginationControls({ pagination }: { pagination: Pagination }) {
  const { currentPage, totalPages, totalItems, hasNextPage, hasPrevPage } =
    pagination;

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

  return (
    <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
      <p className="text-sm text-gray-400">
        Showing page{" "}
        <span className="text-indigo-400 font-semibold">{currentPage}</span> of{" "}
        <span className="text-indigo-400 font-semibold">{totalPages}</span>
        <span className="text-gray-500 ml-2">({totalItems} total users)</span>
      </p>

      <nav className="flex items-center gap-1">
        {hasPrevPage ? (
          <Link
            href={`/users?page=${currentPage - 1}`}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] hover:border-indigo-400/50 transition-all text-sm font-medium"
          >
            ← Prev
          </Link>
        ) : (
          <span className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-gray-600 text-sm font-medium cursor-not-allowed">
            ← Prev
          </span>
        )}

        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((pageNum, idx) =>
            pageNum === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <Link
                key={pageNum}
                href={`/users?page=${pageNum}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  pageNum === currentPage
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] hover:border-indigo-400/50"
                }`}
              >
                {pageNum}
              </Link>
            )
          )}
        </div>

        {hasNextPage ? (
          <Link
            href={`/users?page=${currentPage + 1}`}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] hover:border-indigo-400/50 transition-all text-sm font-medium"
          >
            Next →
          </Link>
        ) : (
          <span className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-gray-600 text-sm font-medium cursor-not-allowed">
            Next →
          </span>
        )}
      </nav>
    </div>
  );
}

