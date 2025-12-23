"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export function ComboBox({
  value,
  onChange,
  options,
  placeholder,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full flex justify-between items-center px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F] text-base">
          {value ? value : placeholder || "Select option"}
          <ChevronsUpDown className="opacity-50 h-4 w-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder}`} />
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    option === value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
