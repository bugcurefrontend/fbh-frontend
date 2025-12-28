"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SubItem {
  label: string;
  href: string;
}

interface NavigationItem {
  label: string;
  href?: string;
  sub?: SubItem[];
}

interface NavigationMenuProps {
  navigationItems: NavigationItem[];
  className?: string;
}

export function CustomNavigationMenu({
  navigationItems,
  className,
}: NavigationMenuProps) {
  return (
    <nav
      className={cn(
        "relative hidden md:flex flex-1 items-center justify-center",
        className
      )}
    >
      <ul className="flex flex-1 list-none items-center justify-center">
        {navigationItems.map((item) =>
          item.sub ? (
            <NavigationMenuItem key={item.label} item={item} />
          ) : (
            <li key={item.label}>
              <Link
                href={item.href || "#"}
                className="group inline-flex items-center justify-center bg-background p-2 uppercase text-xs font-bold leading-[18px] text-center align-middle text-[#19212C] rounded-none hover:bg-[#E6EBF5] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

function NavigationMenuItem({ item }: { item: NavigationItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <li
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "group inline-flex items-center justify-center bg-background p-2 uppercase text-xs font-bold leading-[18px] text-center align-middle text-[#19212C] rounded-none hover:bg-[#E6EBF5] transition-colors",
          "hover:bg-[#E6EBF5] focus:bg-[#E6EBF5] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none"
        )}
      >
        {item.label}
        <ChevronDownIcon
          className={cn(
            "ml-1 size-4 transition duration-300",
            isOpen && "rotate-180"
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {isOpen && item.sub && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 overflow-hidden border bg-white shadow-md animate-in fade-in-0 zoom-in-95"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-0 py-2">
            <ul className="grid">
              {item.sub.map((subItem) => (
                <li key={subItem.label}>
                  <Link
                    href={subItem.href}
                    className="block text-[16px] font-medium hover:bg-[#E6EBF5] px-4 py-2 transition-colors truncate"
                  >
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}
