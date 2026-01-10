import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Country, truncateText } from "@/lib/location-utils";
import countriesData from "@/assets/data/countries.json";

interface CountryAutocompleteProps {
  name?: string;
  hint?: string;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
  defaultValue?: number | Country;
  help_text?: string;
  onChange?: (_country: Country) => void;
  disabled?: boolean;
  readOnly?: boolean;
  value?: Country | null; // Allow null to match typical form state
  placeholder?: string;
}

export default function CountryAutocomplete({
  name,
  hint,
  className,
  label,
  required,
  error,
  defaultValue,
  help_text,
  onChange,
  disabled,
  readOnly,
  value,
  placeholder = "Select country...",
}: CountryAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );

  // Use same env vars as donations site, with fallback to production static API
  const API_URL =
    process.env.NEXT_PUBLIC_API_DATA_FETCH_URL ||
    process.env.REACT_APP_API_DATA_FETCH_URL ||
    process.env.NEXT_PUBLIC_STATIC_API_URL ||
    "https://static-api.heartfulness.org";

  // Convert local countries data to the expected format
  const localCountries: Country[] = React.useMemo(() => {
    return countriesData.map((country: any) => ({
      id: country.numeric, // Use numeric as id
      name: country.englishShortName,
      code: country.countryCode,
      active: true,
      numeric: country.numeric,
    }));
  }, []);

  React.useEffect(() => {
    if (defaultValue) {
      const defaultId =
        typeof defaultValue === "number" ? defaultValue : defaultValue.id;
      // If defaultId is 0 or invalid, skip
      if (!defaultId) return;

      fetch(`${API_URL}/countries/id/${defaultId}.json`)
        .then((res) => res.json())
        .then((res) => {
          if (res?.name) {
            const country: Country = {
              id: res.id,
              name: res.name,
              code: res.code,
              active: res.active,
            };
            setSelectedCountry(country);
            setSearchTerm(res.name);
            if (onChange) onChange(country);
          }
        })
        .catch(() => {
          // Try to find in local data
          const localCountry = localCountries.find((c) => c.id === defaultId);
          if (localCountry) {
            setSelectedCountry(localCountry);
            setSearchTerm(localCountry.name);
            if (onChange) onChange(localCountry);
          }
        });
    }
  }, [defaultValue, onChange, API_URL, localCountries]);

  React.useEffect(() => {
    // Load local countries immediately as initial data
    const sortedLocalCountries = [...localCountries];
    sortedLocalCountries.sort((a, b) => {
      if (a.name === "India" || a.name === "United States") return -1;
      if (b.name === "India" || b.name === "United States") return 1;
      return a.name.localeCompare(b.name);
    });
    setCountries(sortedLocalCountries);

    // Then try to fetch from API to update if available
    fetch(`${API_URL}/countries/all.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res?.length && Array.isArray(res)) {
          const result: Country[] = res.map(
            (i: {
              name: string;
              id: number;
              code: string;
              active: boolean;
            }) => ({
              id: i.id,
              name: i.name,
              code: i.code,
              active: i.active,
            })
          );
          const finalResults = [...result];
          finalResults.sort((a, b) => {
            if (a.name === "India" || a.name === "United States") return -1;
            if (b.name === "India" || b.name === "United States") return 1;
            return a.name.localeCompare(b.name);
          });
          setCountries(finalResults);
        }
        // If API returns empty or invalid data, keep using local data (already set above)
      })
      .catch((err) => {
        // Silently fail and keep using local data (already set above)
        console.log("Using local countries data (API unavailable)");
      });
  }, [API_URL, localCountries]);

  const filteredCountries = React.useMemo(() => {
    // Filter out any invalid entries and only show countries with valid names
    // Also filter out any entries that look like error codes (numbers only)
    return countries
      .filter((country) => {
        // Must have a valid country object with name
        if (!country || !country.name || typeof country.name !== "string") {
          return false;
        }
        // Filter out entries that are just numbers (like "507")
        if (/^\d+$/.test(country.name.trim())) {
          return false;
        }
        // Filter out very short names that might be error codes
        if (country.name.trim().length < 2) {
          return false;
        }
        return true;
      })
      .filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [countries, searchTerm]);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    if (onChange) onChange(country);
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!disabled && !readOnly) {
      setOpen(newOpen);
    }
  };

  // Sync internal state with external value prop
  React.useEffect(() => {
    // If controlled value provided, update internal selection
    if (value) {
      setSelectedCountry(value);
    } else if (value === null) {
      setSelectedCountry(null);
    }
  }, [value]);

  return (
    <div className={cn(className, disabled && "cursor-not-allowed")}>
      {label && (
        <div className="h-6">
          <label
            htmlFor={name}
            className="block text-xs text-[#344054] font-semibold mb-1.5"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
            {help_text && (
              <span
                className="text-muted-foreground ml-1 cursor-help"
                title={help_text}
              >
                ℹ️
              </span>
            )}
          </label>
        </div>
      )}
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a country"
            className={cn(
              "font-base-size h-[46px] w-full justify-between rounded-[8px] bg-white px-3 py-2 !text-base !text-[#4C4748]",
              !selectedCountry && "text-muted",
              `${error ? "border-red-500" : "border border-[#D0D5DD]"}`,
              open && "rounded-b-none",
              (disabled || readOnly) && "cursor-not-allowed opacity-50"
            )}
            disabled={disabled || readOnly}
            onClick={(e) => {
              e.preventDefault();
              if (!disabled && !readOnly) {
                setOpen(!open);
              }
            }}
          >
            <span
              className={
                !value?.name
                  ? "text-[#7d8083] font-normal"
                  : "text-[#090C0F] truncate"
              }
            >
              {value?.name || placeholder}
            </span>
            <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="relative z-50 !h-[150px] !w-[280px] overflow-y-auto rounded-[8px] bg-white p-0 !text-base"
          align="start"
          side="bottom"
        >
          <Command>
            <CommandInput
              placeholder="Search country..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="h-11 border-0 outline-none focus:border-0 focus:outline-none focus:ring-0"
            />
            <CommandList className="h-[150px]">
              <CommandEmpty className="text-center py-2 text-gray-500">
                No countries found.
              </CommandEmpty>
              <CommandGroup>
                {filteredCountries.map((country) => (
                  <CommandItem
                    key={country.id}
                    value={country.name}
                    onSelect={() => handleSelect(country)}
                    className="cursor-pointer px-2 py-1.5 text-sm hover:translate-x-1 transition-transform z-50"
                  >
                    {truncateText(country.name, 40)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {hint && <p className="text-muted-foreground text-sm">{hint}</p>}
      {error && (
        <p className="text-xs text-red-500 font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
