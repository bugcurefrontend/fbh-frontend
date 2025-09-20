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
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      const pages = [];
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
      return pages;
    }

    // For >7 pages: Different layouts for desktop vs mobile
    return (
      <>
        {/* Desktop pagination: 1 2 3 ... 8 9 10 */}
        <div className="hidden md:flex">
          {/* First 3 pages */}
          {[1, 2, 3].map((pageNum) => (
            <PaginationItem key={`desktop-${pageNum}`}>
              <PaginationLink
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNum);
                }}
                isActive={currentPage === pageNum}
                className={
                  currentPage === pageNum
                    ? "bg-blue-50 text-[#003399]"
                    : "text-gray-600 hover:text-[#003399]"
                }
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem key="ellipsis-desktop">
            <PaginationEllipsis />
          </PaginationItem>

          {/* Last 3 pages */}
          {[totalPages - 2, totalPages - 1, totalPages].map((pageNum) => (
            <PaginationItem key={`desktop-${pageNum}`}>
              <PaginationLink
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNum);
                }}
                isActive={currentPage === pageNum}
                className={
                  currentPage === pageNum
                    ? "bg-blue-50 text-[#003399]"
                    : "text-gray-600 hover:text-[#003399]"
                }
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        {/* Mobile pagination: current, next, ..., last 2 */}
        <div className="flex md:hidden border border-gray-300 rounded-md overflow-hidden">
          {/* Previous button */}
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
                  ? "pointer-events-none opacity-50 border-r border-gray-300 rounded-none"
                  : "text-gray-600 hover:text-[#003399] border-r border-gray-300 rounded-none"
              }
            />
          </PaginationItem>

          {/* Current page */}
          <PaginationItem key={`mobile-${currentPage}`}>
            <PaginationLink
              href="#"
              size="default"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage);
              }}
              isActive={true}
              className="bg-blue-50 text-[#003399] border-r border-gray-300 rounded-none"
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {/* Next page (if not last page) */}
          {currentPage < totalPages && (
            <PaginationItem key={`mobile-${currentPage + 1}`}>
              <PaginationLink
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage + 1);
                }}
                isActive={false}
                className="text-gray-600 hover:text-[#003399] border-r border-gray-300 rounded-none"
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis */}
          <PaginationItem key="ellipsis-mobile">
            <span className="flex h-9 w-9 items-center justify-center border-r border-gray-300">
              <PaginationEllipsis />
            </span>
          </PaginationItem>

          {/* Last 2 pages */}
          {[totalPages - 1, totalPages].map((pageNum) => {
            if (pageNum > currentPage + 1 && pageNum > 0) {
              return (
                <PaginationItem key={`mobile-${pageNum}`}>
                  <PaginationLink
                    href="#"
                    size="default"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNum);
                    }}
                    isActive={currentPage === pageNum}
                    className={
                      currentPage === pageNum
                        ? "bg-blue-50 text-[#003399] rounded-none border-r border-gray-300"
                        : "text-gray-600 hover:text-[#003399] rounded-none border-r border-gray-300"
                    }
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return null;
          })}

          {/* Next button */}
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
                  ? "pointer-events-none opacity-50 rounded-none"
                  : "text-gray-600 hover:text-[#003399] rounded-none"
              }
            />
          </PaginationItem>
        </div>
      </>
    );
  };

  return (
    <div className="border-t border-gray-200 pt-8 overflow-hidden">
      <Pagination>
        <PaginationContent className="w-full justify-center">
          <div className="flex">{renderPageNumbers()}</div>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProjectsPagination;
