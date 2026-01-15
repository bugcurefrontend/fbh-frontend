"use client";

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";
import { City, displayCity, formatCityName } from "@/lib/location-utils";

interface CityAutocompleteProps {
    name?: string;
    hint?: string;
    className?: string;
    label?: string;
    required?: boolean;
    error?: string;
    defaultCountry?: string;
    defaultValue?: City | null;
    help_text?: string;
    onChange?: (_val: City) => void;
    value?: City | null;
    setError?: (_error: string) => void;
    placeholder?: string;
}

export default function CityAutocomplete({
    name,
    hint,
    className,
    label,
    required,
    error,
    defaultCountry,
    defaultValue,
    help_text,
    value,
    onChange,
    placeholder = "Select city...",
}: CityAutocompleteProps) {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [cities, setCities] = React.useState<City[]>([]);

    // Use same env vars as donations site, with fallback to production static API
    const API_URL = process.env.NEXT_PUBLIC_API_DATA_FETCH_URL ||
        process.env.REACT_APP_API_DATA_FETCH_URL ||
        process.env.NEXT_PUBLIC_STATIC_API_URL ||
        "https://static-api.heartfulness.org";

    const clearSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSearchTerm("");
        setCities([]);
        if (onChange) {
            // Pass a partial empty object or handle null upstream. 
            // The original code passed { id: "", name: "" }
            onChange({ id: "", name: "" } as City);
        }
    };

    React.useEffect(() => {
        const currentDisplay = value?.id ? displayCity(value) : (value?.name || "");

        // Only update searchTerm if it's significantly different from the current display value
        // and we are NOT in the middle of an active search (searchTerm change)
        if (currentDisplay !== searchTerm) {
            // If we have a value by name but no id (initial state or manual entry)
            if (value?.name && !value?.id) {
                setSearchTerm(value.name);
            } else if (value?.id) {
                // If we have an ID but missing details, fetch them
                if (!value.complete_name || !value.state) {
                    fetch(`${API_URL}/cities/id/${value.id}.json`)
                        .then((res) => res.json())
                        .then((res) => {
                            if (res && res.id === value.id && onChange) {
                                // Only call onChange if the ID is still the same to avoid race conditions
                                // and don't trigger if it's already what we have
                                if (res.complete_name !== value.complete_name) {
                                    onChange(res);
                                }
                            }
                        })
                        .catch(() => {
                            setSearchTerm(displayCity(value));
                        });
                } else {
                    setSearchTerm(displayCity(value));
                }
            } else if (!value?.name) {
                setSearchTerm("");
            }
        }
    }, [value?.id, value?.name, value?.state, value?.complete_name, API_URL]); // Use specific properties to avoid object reference issues

    const handleSelect = React.useCallback((city: City) => {
        if (onChange) {
            onChange(city);
        }
        setSearchTerm(displayCity(city));
        setOpen(false);
    }, [onChange]);

    React.useEffect(() => {
        if (defaultValue?.id) {
            fetch(`${API_URL}/cities/id/${defaultValue?.id}.json`)
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        handleSelect(res);
                    }
                });
        }
    }, [defaultValue, handleSelect, API_URL]);

    // Debounced server-side search to fetch matching city batches (avoids full "aaa.json" fetch which may be blocked)
    useDebounce(
        async () => {
            try {
                if (
                    searchTerm &&
                    searchTerm.length > 2 &&
                    API_URL
                ) {
                    const searchkey = searchTerm.slice(0, 3).toLowerCase();
                    // Normalize country filter to lowercase; API can be case-sensitive
                    const countryFilter = defaultCountry ? `${String(defaultCountry).toLowerCase()}/` : "";

                    const url = `${API_URL}/cities/${countryFilter}${searchkey}.json`;
                    console.log('🔍 Searching cities from:', url, ' (term:', searchTerm, 'key:', searchkey, ')');

                    let response = await fetch(url);

                    // If blocked (403) or not ok, try a fallback without country filter
                    if (!response.ok) {
                        console.warn('⚠️ Primary cities request failed:', response.status, '— trying fallback without country filter');
                        const fallbackUrl = `${API_URL}/cities/${searchkey}.json`;
                        console.log('🔍 Fallback searching cities from:', fallbackUrl);
                        response = await fetch(fallbackUrl);
                    }

                    if (!response.ok) {
                        console.error('❌ Failed to fetch cities:', response.status);
                        setCities([]);
                        return;
                    }

                    const data = await response.json();
                    if (data && Array.isArray(data) && data.length > 0) {
                        setCities(data);

                        // If we have a value by name but no id, try to auto-select exact match
                        if (value?.name && !value?.id && data.length > 0) {
                            const exactMatch = data.find((city: City) => city.name.toLowerCase() === value.name.toLowerCase());
                            if (exactMatch && onChange) {
                                onChange(exactMatch);
                                setSearchTerm(displayCity(exactMatch));
                                setCities([]);
                            }
                        }
                    } else {
                        setCities([]);
                    }
                } else {
                    // when search term too short, clear results to avoid unnecessary fetches
                    setCities([]);
                }
            } catch (e) {
                console.error('❌ Error fetching cities:', e);
                setCities([]);
            }
        },
        500,
        [searchTerm, defaultCountry, value]
    );

    // Client-side filtering based on search term
    const filteredCities = React.useMemo(() => {
        if (!searchTerm || searchTerm.length === 0) {
            return cities; // Show all cities when no search term
        }

        const searchLower = searchTerm.toLowerCase();
        return cities.filter((city) => {
            const cityName = city.name.toLowerCase();
            const completeName = city.complete_name?.toLowerCase() || '';
            return cityName.includes(searchLower) || completeName.includes(searchLower);
        });
    }, [cities, searchTerm]);

    const formattedOption = ({ name, complete_name }: City) => {
        const completeName = complete_name ? complete_name?.split("/").reverse().slice(1) : [];
        const completeNameString = completeName?.length > 0 ? completeName.join(", ") : ``;
        return (
            <div className="block !text-base" data-testid="option-name">
                <div className="block font-medium text-primary">{name}</div>
                <div>
                    <span className="block !text-base text-gray-600">
                        {formatCityName(completeNameString)}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className={className}>
            <div className="h-6">
                {label && (
                    <label htmlFor={name} className="block text-xs text-[#344054] font-semibold mb-1.5">
                        {label}
                        {required && <span className="text-red-500"> *</span>}
                        {help_text && (
                            <span className="text-muted-foreground ml-1 cursor-help" title={help_text}>
                                ℹ️
                            </span>
                        )}
                    </label>
                )}
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative w-full">
                        <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                "font-base-size placeholder-styles h-[44px] w-full justify-between rounded-[8px] bg-white px-3 py-2 !text-base !text-[#4C4748]",
                                !searchTerm && "text-muted-foreground",
                                `${error ? "border-red-500" : "border border-[#D1D1D1]"}`,
                                open && "rounded-b-none"
                            )}
                            onClick={() => setOpen(!open)}
                        >
                            <span
                                className={`flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-left ${!value?.id ? "text-gray-400" : "text-[#090C0F]"}`}
                            >
                                {value?.id ? displayCity(value) : placeholder}
                            </span>

                            <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                        {value?.id && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={clearSearch}
                                className="absolute right-2 top-0 ml-5 h-full p-0 opacity-50 hover:bg-transparent"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="z-[100] !h-[150px] !w-[280px] overflow-y-auto rounded-[8px] bg-white p-0 !text-base"
                    align="start"
                    side="bottom"
                >
                    <Command shouldFilter={false}>
                        <div className="flex items-center border-b px-3">
                            <CommandInput
                                placeholder="Search city..."
                                value={searchTerm}
                                onValueChange={setSearchTerm}
                                className="h-11 border-0 !text-base outline-none focus:border-0 focus:outline-none focus:ring-0"
                            />
                        </div>
                        <CommandList className="h-[150px]">
                            <CommandEmpty className="text-center py-2 text-gray-500">
                                {searchTerm.length < 3
                                    ? "Type at least 3 characters to search cities"
                                    : "No cities found"}
                            </CommandEmpty>
                            <CommandGroup>
                                {filteredCities.map((city) => (
                                    <CommandItem
                                        key={city.id}
                                        value={city.name}
                                        onSelect={() => handleSelect(city)}
                                        className="cursor-pointer px-2 py-1.5 text-sm hover:translate-x-1 transition-transform"
                                    >
                                        {formattedOption(city)}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {hint && <p className="text-muted-foreground text-sm">{hint}</p>}
            {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
        </div>
    );
}
