"use client";

import * as React from "react";
import { Check, ChevronDownIcon } from "lucide-react";
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
import Image from "next/image";

interface ComboBoxOption {
  text: string;
  image?: string;
}

interface ComboBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | ComboBoxOption)[];
  placeholder?: string;
  contentClassName?: string;
}

export function ComboBox({
  value,
  onChange,
  options,
  placeholder,
  contentClassName,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!value && options.length > 0) {
      const first =
        typeof options[0] === "string" ? options[0] : options[0].text;

      onChange(first);
    }
  }, [value, options, onChange]);

  const selectedOption = options.find((opt) =>
    typeof opt === "string" ? opt === value : opt.text === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full flex justify-between items-center px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs text-base">
          {selectedOption ? (
            typeof selectedOption === "string" ? (
              selectedOption
            ) : (
              <div className="flex items-center">
                <Image
                  src={selectedOption.image!}
                  alt={selectedOption.text}
                  width={16}
                  height={16}
                  className="mr-2"
                />
                {selectedOption.text}
              </div>
            )
          ) : (
            placeholder || "Select option"
          )}
          <ChevronDownIcon className="size-6 text-[#63676C]" />
        </button>
      </PopoverTrigger>

      <PopoverContent className={cn("p-0", contentClassName ?? "w-60")}>
        <Command>
          <CommandInput placeholder={`Search ${placeholder}`} />
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup>
            {options.map((option) => {
              const text = typeof option === "string" ? option : option.text;
              const image =
                typeof option === "string" ? undefined : option.image;
              return (
                <CommandItem
                  key={text}
                  value={text}
                  onSelect={() => {
                    onChange(text);
                    setOpen(false);
                  }}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={text}
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                  )}
                  {text}
                  <Check
                    className={cn(
                      "ml-auto h-5 w-5 text-[#2B56AB]",
                      text === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
