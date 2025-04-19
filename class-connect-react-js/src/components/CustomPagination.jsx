import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "../lib/utils";

const CustomPagination = () => {
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 6);

  const [dates, setDates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(today);
  const [currentWeekEndDate, setCurrentWeekEndDate] = useState(endOfWeek);

  const generateWeekDates = useCallback(
    (startDate = currentWeekStartDate) => {
      const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date;
      });
      return weekDates;
    },
    [currentWeekStartDate]
  );

  useEffect(() => {
    setDates(generateWeekDates(currentWeekStartDate));
  }, [generateWeekDates, currentWeekStartDate]);

  const handleDateClick = (index) => {
    setSelectedIndex(index);
    // Question: What else might we want to do when a date is selected?
    // Answer(me): I would need to update the shown class lists too, i might either add those classscrollbars into this too or somehow alert the main page
  };

  const handlePreviousClick = () => {
    // e.preventDefault();
    // Create new dates for the previous week
    const newStart = new Date(currentWeekStartDate);
    newStart.setDate(currentWeekStartDate.getDate() - 7);

    const newEnd = new Date(currentWeekEndDate);
    newEnd.setDate(currentWeekEndDate.getDate() - 7);

    // Update the state
    setCurrentWeekStartDate(newStart);
    setCurrentWeekEndDate(newEnd);
    setSelectedIndex(0); // Reset selected date to first of new week
  };

  const handleNextClick = () => {
    // e.preventDefault();
    // Create new dates for the previous week
    const newStart = new Date(currentWeekStartDate);
    newStart.setDate(currentWeekStartDate.getDate() + 7);

    const newEnd = new Date(currentWeekEndDate);
    newEnd.setDate(currentWeekEndDate.getDate() + 7);

    // Update the state
    setCurrentWeekStartDate(newStart);
    setCurrentWeekEndDate(newEnd);
    setSelectedIndex(0); // Reset selected date to first of new week
  };

  const isPreviousDisabled = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStartDate = new Date(currentWeekStartDate);
    weekStartDate.setHours(0, 0, 0, 0);

    return weekStartDate.getTime() <= today.getTime();
  }, [currentWeekStartDate]);

  return (
    <Pagination className="mt-5 mb-5">
      <PaginationContent className="gap-4">
        <PaginationPrevious
          onClick={() => !isPreviousDisabled() && handlePreviousClick()}
          className={cn(
            "transition-all",
            !isPreviousDisabled() && "hover:cursor-pointer hover:bg-accent",
            isPreviousDisabled() && "pointer-events-none opacity-50"
          )}
        />
        {dates.map((date, index) => (
          <PaginationItem key={date.toISOString()} className="w-25">
            <PaginationLink
              href="#"
              className="w-25"
              isActive={index === selectedIndex}
              onClick={() => handleDateClick(index)}
            >
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationNext
          onClick={handleNextClick}
          className="hover:cursor-pointer"
          // disabled={currentWeekEndDate.getTime() <= today.getTime()}
        />
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
