import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxShown = 5;
    let start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxShown - 1);

    if (end - start < maxShown - 1) {
      start = Math.max(1, end - maxShown + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 rounded border font-semibold ${
            page === i
              ? "bg-blue-500 text-white border-blue-500"
              : "text-blue-700 border-blue-400 hover:bg-blue-100 hover:text-blue-600"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8 text-lg">
      {page > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className={`px-4 py-2 rounded border font-semibold ${
            page === 1
              ? "border-blue-200 text-blue-200 cursor-not-allowed"
              : "border-blue-400 text-blue-700 hover:bg-blue-100 hover:text-blue-600"
          }`}
        >
          «
        </button>
      )}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded border font-semibold ${
          page === 1
            ? "border-blue-200 text-blue-200 cursor-not-allowed"
            : "border-blue-400 text-blue-700 hover:bg-blue-100 hover:text-blue-600"
        }`}
      >
        ‹
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded border font-semibold ${
          page === totalPages
            ? "border-blue-200 text-blue-200 cursor-not-allowed"
            : "border-blue-400 text-blue-700 hover:bg-blue-100 hover:text-blue-600"
        }`}
      >
        ›
      </button>
      {page < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-4 py-2 rounded border border-blue-400 text-blue-700 hover:bg-blue-100 hover:text-blue-600 font-semibold"
        >
          »
        </button>
      )}
    </div>
  );
};
