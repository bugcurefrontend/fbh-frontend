"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export type CurrencyCode = "INR" | "USD";

const currencies: { code: CurrencyCode; flag: string }[] = [
  { code: "INR", flag: "/images/flag.png" },
  { code: "USD", flag: "/images/us.png" },
];

/**
 * Hook to get and set currency from URL search params
 * Default: INR
 */
export function useCurrency() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currency = (searchParams.get("currency") as CurrencyCode) || "INR";
  const currencySymbol = currency === "INR" ? "₹" : "$";

  const setCurrency = useCallback(
    (newCurrency: CurrencyCode) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("currency", newCurrency);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  return { currency, currencySymbol, setCurrency };
}

export default function CurrencySelect() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  const selected = currencies.find((c) => c.code === currency) || currencies[0];

  const handleSelect = (currencyOption: (typeof currencies)[0]) => {
    setCurrency(currencyOption.code);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Selected currency button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 border-[3px] border-[#E6E6E6] rounded-sm px-1.5 py-1 bg-white hover:bg-[#E6EBF5]"
      >
        <Image src={selected.flag} alt={selected.code} width={25} height={25} />
        <span className="text-sm leading-5 text-[#333333]">
          {selected.code}
        </span>
        <span className="text-gray-500">
          <ChevronDown size={16} />
        </span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border-[3px] border-[#E6E6E6] rounded-sm z-20 overflow-hidden">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => handleSelect(c)}
              className="flex items-center gap-1 w-full px-1.5 py-1 hover:bg-[#E6EBF5]"
            >
              <Image src={c.flag} alt={c.code} width={25} height={25} />
              <span className="text-sm leading-5 text-[#333333]">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
