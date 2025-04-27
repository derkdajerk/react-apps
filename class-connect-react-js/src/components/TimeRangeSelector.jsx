import * as React from "react";
import { useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const generateTimes = () => {
  const timesList = [];
  for (let i = 15; i < 47; i++) {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const militaryTime = `${hour.toString().padStart(2, "0")}:${minutes}`;

    const amPm = hour < 12 ? "AM" : "PM";
    const displayHour = hour === 0 || hour === 12 ? 12 : hour % 12;
    const displayTime = `${displayHour}:${minutes} ${amPm}`;

    timesList.push({
      value: militaryTime,
      label: displayTime,
    });
  }
  return timesList;
};

const isValidTimeRange = (start, end) => {
  if (!start || !end) return true;
  return start < end;
};

export function TimeRangeSelector({ onTimeChange }) {
  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);
  const [startValue, setStartValue] = React.useState("");
  const [endValue, setEndValue] = React.useState("");

  const timeOptions = useMemo(() => generateTimes(), []);

  const handleStartTimeSelect = (currentValue) => {
    const newStartValue = currentValue === startValue ? "" : currentValue;

    if (endValue && !isValidTimeRange(newStartValue, endValue)) {
      toast.error("Start time must be before end time", {
        description: "Please select a valid time range",
      });
      return;
    }

    setStartValue(newStartValue);
    setStartOpen(false);
    if (
      (newStartValue && endValue) ||
      (newStartValue === "" && endValue === "")
    ) {
      onTimeChange({ start: newStartValue, end: endValue });
    }
  };

  const handleEndTimeSelect = (currentValue) => {
    const newEndValue = currentValue === endValue ? "" : currentValue;

    if (startValue && !isValidTimeRange(startValue, newEndValue)) {
      toast.error("End time must be after start time", {
        description: "Please select a valid time range",
      });
      return;
    }

    setEndValue(newEndValue);
    setEndOpen(false);
    if (
      (startValue && newEndValue) ||
      (startValue === "" && newEndValue === "")
    ) {
      onTimeChange({ start: startValue, end: newEndValue });
    }
  };

  const clearTimeRange = () => {
    setStartValue("");
    setEndValue("");
    // Always notify parent when clearing
    onTimeChange({ start: "", end: "" });
  };

  return (
    <>
      <div className="flex gap-4">
        {/* Start Time Selector */}
        <Popover open={startOpen} onOpenChange={setStartOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {startValue
                ? timeOptions.find((time) => time.value === startValue)?.label
                : "Select start time..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search times..." className="h-9" />
              <CommandList>
                <CommandEmpty>No time found.</CommandEmpty>
                <CommandGroup>
                  {timeOptions.map(({ value, label }) => (
                    <CommandItem
                      key={value}
                      value={value}
                      onSelect={(label) => {
                        handleStartTimeSelect(label);
                      }}
                    >
                      {label}
                      <Check
                        className={cn(
                          "ml-auto",
                          startValue === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* End Time Selector */}
        <Popover open={endOpen} onOpenChange={setEndOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {endValue
                ? timeOptions.find((time) => time.value === endValue)?.label
                : "Select end time..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search times..." className="h-9" />
              <CommandList>
                <CommandEmpty>No time found.</CommandEmpty>
                <CommandGroup>
                  {timeOptions.map(({ value, label }) => (
                    <CommandItem
                      key={value}
                      value={value}
                      onSelect={(label) => {
                        handleEndTimeSelect(label);
                      }}
                    >
                      {label}
                      <Check
                        className={cn(
                          "ml-auto",
                          endValue === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-4 justify-center mt-2">
        <Button
          variant="secondary"
          className="bg-gray-400 hover:bg-gray-500 hover:font-bold"
          onClick={clearTimeRange}
        >
          Clear
        </Button>
      </div>
    </>
  );
}
