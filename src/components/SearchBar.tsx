"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search by Project name...",
}) => {
  return (
    <div className="relative max-w-[400px] mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-4 pr-12 py-3 h-10 rounded-lg border border-gray-300 focus:ring-0 focus-visible:ring-0 text-sm leading-[20px] placeholder:text-gray-800 text-gray-800"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search className="w-4 h-4 text-[#63676C]" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
