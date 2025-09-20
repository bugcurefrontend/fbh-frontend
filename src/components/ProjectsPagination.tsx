"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface ProjectsPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

const ProjectsPagination: React.FC<ProjectsPaginationProps> = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              size="default"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              isActive={currentPage === i}
              className={
                currentPage === i
                  ? "bg-blue-50 text-[#003399]"
                  : "text-gray-600 hover:text-[#003399]"
              }
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            size="default"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
            isActive={currentPage === 1}
            className={
              currentPage === 1
                ? "bg-blue-50 text-[#003399]"
                : "text-gray-600 hover:text-[#003399]"
            }
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i);
                }}
                isActive={currentPage === i}
                className={
                  currentPage === i
                    ? "bg-blue-50 text-[#003399]"
                    : "text-gray-600 hover:text-[#003399]"
                }
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              size="default"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
              isActive={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? "bg-blue-50 text-[#003399]"
                  : "text-gray-600 hover:text-[#003399]"
              }
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <div className="border-t border-gray-200 pt-8 overflow-hidden">
      <Pagination>
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              size="default"
              onClick={(e) => {
                e.preventDefault();
                if (hasPrevious) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={
                !hasPrevious
                  ? "pointer-events-none opacity-50"
                  : "text-gray-600 hover:text-[#003399] border border-gray-200 rounded-lg"
              }
            />
          </PaginationItem>

          <div className="flex">{renderPageNumbers()}</div>

          <PaginationItem>
            <PaginationNext
              href="#"
              size="default"
              onClick={(e) => {
                e.preventDefault();
                if (hasNext) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={
                !hasNext
                  ? "pointer-events-none opacity-50"
                  : "text-gray-600 hover:text-[#003399] border border-gray-200 rounded-lg"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProjectsPagination;
