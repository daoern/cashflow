import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from "@/lib/shadcnUi";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export interface CommandSelectLabelValue {
  label: React.ReactNode;
  value: string;
}

interface CommandSelectProps {
  value: any;
  items: CommandSelectLabelValue[];
  placeholder?: string;
  searchInputPlaceholder?: string;
  emptySearchDisplay?: React.ReactNode;
  onSelect?: ((value: string) => void) | undefined;
}

function CommandSelect(props: CommandSelectProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Popover modal={true} open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-48 justify-between",
            !props.value && "text-muted-foreground",
          )}
        >
          {props.value
            ? props.items.find((item) => item.value === props.value)?.label
            : props.placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          <CommandInput
            placeholder={props.searchInputPlaceholder}
            className="h-9"
          />
          <CommandEmpty>{props.emptySearchDisplay}</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {props.items.map((item) => {
              return (
                <CommandItem
                  value={item.value}
                  key={item.value}
                  onSelect={() => {
                    props.onSelect?.(item.value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      item.value === props.value ? "opacity-100" : "opacity-0",
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

export default CommandSelect;
