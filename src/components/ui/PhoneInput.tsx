"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  type CountryCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { getCountryCallingCode } from "libphonenumber-js/max";
import ReactCountryFlag from "react-country-flag";
import countries from "@/assets/data/countries.json";

interface PhoneInputChange {
  countryCode: CountryCode;
  phoneNumber: string;
  isValid: boolean;
}

interface CountryData {
  englishShortName: string;
  frenchShortName: string;
  countryCode: CountryCode | any;
  alpha3Code: string;
  numeric: number;
}

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  required?: boolean;
  error?: string;
  onChange?: (_data: PhoneInputChange) => void;
  label?: string;
  help_text?: string;
  hint?: string;
  setError?: (_err: string) => void;
  country?: CountryCode;
  className?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      name,
      required,
      error,
      label,
      help_text,
      hint,
      onChange,
      className,
      country = "IN",
      value,
      ...props
    },
    ref
  ) => {
    const countriesData: CountryData[] = countries as unknown as CountryData[];
    const [selectedCountry, setSelectedCountry] =
      React.useState<CountryCode>(country);
    const [phoneNumber, setPhoneNumber] = React.useState<string>(
      String(value || "")
    );
    const [isValid, setIsValid] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    React.useEffect(() => {
      if (country) setSelectedCountry(country);
    }, [country]);

    const filteredCountries = React.useMemo(() => {
      if (!searchTerm.trim()) {
        return countriesData;
      }

      const searchLower = searchTerm.toLowerCase();

      return countriesData
        .filter((c) => c.englishShortName.toLowerCase().includes(searchLower))
        .sort((a, b) => {
          const aName = a.englishShortName.toLowerCase();
          const bName = b.englishShortName.toLowerCase();

          const aStartsWith = aName.startsWith(searchLower);
          const bStartsWith = bName.startsWith(searchLower);

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;

          return aName.localeCompare(bName);
        });
    }, [countriesData, searchTerm]);

    const handleCountryChange = (newCountry: CountryCode) => {
      setSelectedCountry(newCountry);
      validatePhoneNumber(phoneNumber, newCountry);
      setOpen(false);
      setSearchTerm("");
    };

    const handlePhoneNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newValue = e.target.value.replace(/\D/g, "");
      setPhoneNumber(newValue);
      validatePhoneNumber(newValue, selectedCountry);
    };

    const validatePhoneNumber = (number: string, countryCode: CountryCode) => {
      if (number.length === 0) {
        setIsValid(true);
        onChange?.({ countryCode, phoneNumber: number, isValid: false });
        return;
      }
      try {
        const phoneNumberParsed = parsePhoneNumberFromString(
          number,
          countryCode
        );
        const valid = phoneNumberParsed ? phoneNumberParsed.isValid() : false;
        setIsValid(valid);
        onChange?.({ countryCode, phoneNumber: number, isValid: valid });
      } catch {
        setIsValid(false);
        onChange?.({ countryCode, phoneNumber: number, isValid: false });
      }
    };

    return (
      <div className={className}>
        {label && (
          <label htmlFor={name} className="field-label">
            {label} {required && <span className="required"> *</span>}
            {help_text && (
              <span
                className="text-muted-foreground ml-1 cursor-help"
                title={help_text}
              >
                ℹ️
              </span>
            )}
          </label>
        )}
        <div className="flex items-start gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button className="countryCode font-base-size h-[40px] w-28 rounded-[8px] border border-[#D1D1D1] bg-white px-2 py-2 !text-base text-[#4C4748]">
                <span className="flex items-center gap-2 !text-[16px]">
                  <ReactCountryFlag
                    countryCode={String(selectedCountry)}
                    svg
                    className="h-4 w-6 rounded-sm object-contain"
                  />
                  <span className="!text-[16px] text-[#2E4049]">
                    +{getCountryCallingCode(selectedCountry)}
                  </span>
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="popover-size relative z-10 overflow-y-auto rounded-t-none bg-white p-0 !text-base"
              align="start"
              side="bottom"
            >
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search country"
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                />
                <CommandList>
                  {filteredCountries.map((country) => (
                    <CommandItem
                      key={country.countryCode}
                      value={country.englishShortName}
                      onSelect={() => handleCountryChange(country.countryCode)}
                      className="hoverStyles cursor-pointer"
                    >
                      <ReactCountryFlag
                        countryCode={country.countryCode}
                        svg
                        className="h-4 w-6 rounded-sm object-contain"
                      />
                      <span className="ml-2">
                        +{getCountryCallingCode(country.countryCode)}{" "}
                        {country.englishShortName}
                      </span>
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Input
            type="tel"
            name={name}
            id={name}
            ref={ref}
            value={phoneNumber || value}
            onChange={handlePhoneNumberChange}
            className={cn(
              "h-[40px] w-full rounded-[8px] bg-white px-3 py-2 !text-base text-[#0A0A0B] placeholder:text-gray-400",
              `${error ? "error-field" : "border border-[#D1D1D1]"}`,
              isValid && phoneNumber && "border-green-500",
              !isValid && phoneNumber && "border-red-500"
            )}
            placeholder="98765xxxxx"
            {...props}
          />
        </div>
        {(error || (!isValid && phoneNumber)) && (
          <p className="required mt-1 text-sm">
            {error || "Please enter a valid phone number"}
          </p>
        )}
        {hint && <p className="text-sm text-muted">{hint}</p>}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
