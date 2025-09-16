"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface subItem {
  label: string;
  href: string;
}

interface NavigationItem {
  label: string;
  sub: subItem[];
  href?: string;
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
        "relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
    >
      <ul className="flex flex-1 list-none items-center justify-center gap-1">
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.label} item={item} />
        ))}
        <li>
          <a
            href="#"
            className="uppercase text-xs font-bold px-3 py-3 hover:bg-[#E6EBF5] truncate transition-colors"
          >
            Contact us
          </a>
        </li>
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
          "group inline-flex h-9 w-max items-center justify-center bg-background px-4 py-2 uppercase text-xs font-bold rounded-none hover:bg-[#E6EBF5] truncate max-xl:px-2 transition-colors",
          "hover:bg-[#E6EBF5] focus:bg-[#E6EBF5] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none"
        )}
      >
        {item.label}
        <ChevronDownIcon
          className={cn(
            "relative top-[1px] ml-1 size-3 transition duration-300",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 min-w-[200px] overflow-hidden border bg-white shadow-md animate-in fade-in-0 zoom-in-95"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-0 py-2">
            <ul className="grid">
              {item.sub.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block text-[16px] font-medium hover:bg-[#E6EBF5] px-4 py-2 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}
