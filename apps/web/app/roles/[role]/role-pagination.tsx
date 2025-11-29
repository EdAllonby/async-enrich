import Link from "next/link";
import type { Pagination } from "../../users/types";

export function RolePagination({
  role,
  pagination,
}: {
  role: string;
  pagination: Pagination;
}) {
  const { currentPage, totalPages, totalItems, hasNextPage, hasPrevPage } =
    pagination;

  const baseUrl = `/roles/${encodeURIComponent(role)}`;

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
        <span className="text-white font-semibold">{currentPage}</span> of{" "}
        <span className="text-white font-semibold">{totalPages}</span>
        <span className="text-gray-500 ml-2">({totalItems} total)</span>
      </p>

      <nav className="flex items-center gap-1">
        {hasPrevPage ? (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-medium"
          >
            ← Prev
          </Link>
        ) : (
          <span className="px-3 py-2 rounded-lg bg-white/2 border border-white/5 text-gray-600 text-sm font-medium cursor-not-allowed">
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
                href={`${baseUrl}?page=${pageNum}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  pageNum === currentPage
                    ? "bg-white/20 text-white shadow-lg"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                {pageNum}
              </Link>
            )
          )}
        </div>

        {hasNextPage ? (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-medium"
          >
            Next →
          </Link>
        ) : (
          <span className="px-3 py-2 rounded-lg bg-white/2 border border-white/5 text-gray-600 text-sm font-medium cursor-not-allowed">
            Next →
          </span>
        )}
      </nav>
    </div>
  );
}
