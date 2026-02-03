"use client";

import { useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import appStoreInstance, { appActions, CurrencyCode as StoreCurrencyCode } from "@/store/appStore";

export type CurrencyCode = StoreCurrencyCode;

const currencies: { code: CurrencyCode; flag: string }[] = [
  { code: "INR", flag: "/images/flag.png" },
  // { code: "USD", flag: "/images/us.png" },
];

/**
 * Hook to get and set currency
 * - Syncs with URL search params
 * - Syncs with AppStore (LocalStorage)
 */
export function useCurrency() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Subscribe to store updates
  const storeState = useSyncExternalStore(
    (cb) => appStoreInstance.subscribe(cb),
    () => appStoreInstance.getState(),
    () => appStoreInstance.getState() // Server snapshot
  );

  const urlCurrency = searchParams.get("currency") as CurrencyCode | null;

  // Synchronization Logic
  useEffect(() => {
    // 1. If URL has currency, update Store if different
    if (urlCurrency && (urlCurrency === "INR" /* || urlCurrency === "USD" */)) {
      if (storeState.currency !== urlCurrency) {
        appActions.setCurrency(urlCurrency);
      }
    }
    // 2. Clear redundant currency from URL if it's the only option or matches default
    else if (urlCurrency && currencies.length === 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("currency");
      const queryString = params.toString();
      router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
    }
  }, [urlCurrency, storeState.currency, router, pathname, searchParams]);

  const setCurrency = useCallback(
    (newCurrency: CurrencyCode) => {
      // Update Store (which updates LS)
      appActions.setCurrency(newCurrency);

      // Update URL only if we have multiple currencies
      if (currencies.length > 1) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("currency", newCurrency);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        // Clean URL if it's single currency
        const params = new URLSearchParams(searchParams.toString());
        if (params.has("currency")) {
          params.delete("currency");
          const queryString = params.toString();
          router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
        }
      }
    },
    [router, pathname, searchParams]
  );

  return { currency: storeState.currency, currencySymbol: storeState.currency === "INR" ? "₹" : "$", setCurrency };
}

interface CurrencySelectProps {
  className?: string;
  className2?: string;
}

export default function CurrencySelect({
  className,
  className2,
}: CurrencySelectProps) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Determine available currencies based on route
  const availableCurrencies = pathname?.startsWith("/admin")
    ? [
        { code: "INR", flag: "/images/flag.png" } as const,
        { code: "USD", flag: "/images/us.png" } as const,
      ]
    : [{ code: "INR", flag: "/images/flag.png" } as const];

  // Ensure selected is valid
  const selected =
    availableCurrencies.find((c) => c.code === currency) ||
    availableCurrencies[0];

  const handleSelect = (currencyOption: { code: CurrencyCode }) => {
    setCurrency(currencyOption.code);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Selected currency button */}
      <button
        onClick={() => availableCurrencies.length > 1 && setOpen(!open)}
        className={`flex items-center justify-center border-[2px] border-[#E6E6E6] bg-white ${
          availableCurrencies.length > 1
            ? "hover:bg-[#E6EBF5] cursor-pointer"
            : "cursor-default"
        } ${className}`}
      >
        <Image src={selected.flag} alt={selected.code} width={25} height={25} />
        <span className="text-sm leading-5 text-[#333333] ml-1">
          {selected.code}
        </span>
        {availableCurrencies.length > 1 && (
          <span className="text-gray-500">
            <ChevronDown size={16} />
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border-[2px] border-[#E6E6E6] rounded-sm z-20 overflow-hidden">
          {availableCurrencies.map((c) => (
            <button
              key={c.code}
              onClick={() => handleSelect(c)}
              className={`flex items-center w-full py-1 hover:bg-[#E6EBF5] ${className2}`}
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
