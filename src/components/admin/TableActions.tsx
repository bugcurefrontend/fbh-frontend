import { Filter, SortAsc, Upload, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface SortOption {
  label: string;
  value: string;
  direction: "asc" | "desc";
}

interface TableActionsProps {
  // Filter props
  filterOptions?: FilterOption[];
  selectedFilters?: string[];
  onFilterChange?: (filters: string[]) => void;
  filterLabel?: string;

  // Sort props
  sortOptions?: SortOption[];
  selectedSort?: SortOption | null;
  onSortChange?: (sort: SortOption) => void;

  // Legacy props for backward compatibility
  sortOrder?: "asc" | "desc";
  onSortChange_legacy?: () => void;
  statusFilter?: string[];
}

export const TableActions = ({
  filterOptions = [],
  selectedFilters = [],
  onFilterChange,
  filterLabel = "Filter by Status",
  sortOptions = [],
  selectedSort = null,
  onSortChange,
  // Legacy props
  sortOrder,
  onSortChange_legacy,
  statusFilter = [],
}: TableActionsProps) => {
  const [sortPopoverOpen, setSortPopoverOpen] = useState(false);

  // Use legacy mode if legacy props are provided
  const isLegacyMode =
    sortOrder !== undefined && onSortChange_legacy !== undefined;

  const handleSortSelect = (option: SortOption) => {
    if (onSortChange) {
      onSortChange(option);
      setSortPopoverOpen(false);
    }
  };

  const handleFilterChange = (value: string, checked: boolean) => {
    if (!onFilterChange) return;

    if (checked) {
      onFilterChange([...selectedFilters, value]);
    } else {
      onFilterChange(selectedFilters.filter((f) => f !== value));
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Filter Button */}
      {filterOptions.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1.5 text-[#090C0F] font-medium text-base hover:opacity-80 transition-opacity">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4" align="end">
            <div className="space-y-4">
              <h4 className="font-medium leading-none text-sm text-[#090C0F]">
                {filterLabel}
              </h4>
              <div className="space-y-3">
                {filterOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={option.value}
                      checked={selectedFilters.includes(option.value)}
                      onChange={(e) =>
                        handleFilterChange(option.value, e.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-[#003399] focus:ring-[#003399]"
                    />
                    <label
                      htmlFor={option.value}
                      className="truncate text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#454950]"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {filterOptions.length > 0 && <div className="h-6 w-[1px] bg-[#B7B9BB]" />}

      {/* Sort Button */}
      {isLegacyMode ? (
        <button
          className="flex items-center gap-1.5 text-[#090C0F] font-medium text-base hover:opacity-80 transition-opacity"
          onClick={onSortChange_legacy}
        >
          <SortAsc
            className={`w-5 h-5 transition-transform ${
              sortOrder === "desc" ? "rotate-180" : ""
            }`}
          />
          Sort
        </button>
      ) : (
        <Popover open={sortPopoverOpen} onOpenChange={setSortPopoverOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1.5 text-[#090C0F] font-medium text-base hover:opacity-80 transition-opacity">
              <SortAsc className="w-5 h-5" />
              Sort
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="end">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-[#090C0F] mb-3">
                Sort Options
              </h4>
              {sortOptions.map((option) => (
                <button
                  key={`${option.value}-${option.direction}`}
                  onClick={() => handleSortSelect(option)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedSort?.value === option.value &&
                    selectedSort?.direction === option.direction
                      ? "bg-blue-50 text-[#003399] font-semibold"
                      : "text-[#454950] hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Show active sort indicator */}
      {selectedSort && !isLegacyMode && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-md text-sm">
          <span className="text-[#003399] font-medium">
            Sort: {selectedSort.label}
          </span>
          <button
            onClick={() => onSortChange && onSortChange(null as any)}
            className="text-[#003399] hover:opacity-80"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="h-6 w-[1px] bg-[#B7B9BB]" />

      {/* Export Button */}
      <button className="flex items-center gap-1.5 text-[#090C0F] font-medium text-base hover:opacity-80 transition-opacity">
        <Upload className="w-5 h-5" />
        Export
      </button>
    </div>
  );
};
