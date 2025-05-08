import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { FilmsType } from "@/types/FilmsType";

interface Props {
  items: FilmsType[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationComponent = ({
  items,
  currentPage,
  setCurrentPage,
}: Props) => {
  const itemsPerPage = 8;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageIndices = () => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startPage = Math.max(0, Math.min(currentPage - 2, totalPages - 3));
    const endPage = Math.min(totalPages, startPage + 3);
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  };

  return (
    totalPages >= 2 && (
      <div className="flex justify-center">
        <Pagination className="m-4">
          <PaginationPrevious
            onClick={() => {
              if (currentPage !== 1) handlePageChange(currentPage - 1);
            }}
          />
          <PaginationContent>
            {getPageIndices().map((index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium ${
                    currentPage === index + 1
                      ? "transition-all duration-300 ease-in-out bg-primary/5 text-primary"
                      : "transition-none text-neutral"
                  }`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 3 && currentPage < totalPages - 1 && (
              <PaginationEllipsis />
            )}
          </PaginationContent>
          <PaginationNext
            onClick={() => {
              if (currentPage !== totalPages) handlePageChange(currentPage + 1);
            }}
          />
        </Pagination>
      </div>
    )
  );
};
