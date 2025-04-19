/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import ClassScrollBar from "@/components/classScrollBar.jsx";
import { useState, useEffect, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "../lib/utils";
import { createClient } from "@supabase/supabase-js";
import { Progress } from "@/components/ui/progress";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? null;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? null;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}
const supabase = createClient(supabaseUrl, supabaseKey);

const CustomPagination = () => {
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 6);

  const [dates, setDates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(today);
  const [currentWeekEndDate, setCurrentWeekEndDate] = useState(endOfWeek);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [danceClassMDC, setDanceClassMDC] = useState([]);
  const [danceClassTMILLY, setDanceClassTMILLY] = useState([]);
  const [danceClassML, setDanceClassML] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isLoading) {
      setProgress(0);
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(intervalId);
            return 90;
          }
          return prev + 10;
        });
      }, 4);
    } else {
      setProgress(100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoading]);

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
  }, [generateWeekDates]);

  useEffect(() => {
    if (dates.length > 0) {
      const formattedDate = dates[selectedIndex].toISOString().split("T")[0];
      loadClasses(formattedDate);
    }
  }, [selectedIndex, dates]);

  const handleDateClick = (index, date) => {
    setSelectedIndex(index);
  };

  const handlePreviousClick = () => {
    const newStart = new Date(currentWeekStartDate);
    newStart.setDate(currentWeekStartDate.getDate() - 7);
    const newEnd = new Date(currentWeekEndDate);
    newEnd.setDate(currentWeekEndDate.getDate() - 7);

    setCurrentWeekStartDate(newStart);
    setCurrentWeekEndDate(newEnd);
    setSelectedIndex(0);
  };

  const handleNextClick = () => {
    const newStart = new Date(currentWeekStartDate);
    newStart.setDate(currentWeekStartDate.getDate() + 7);
    const newEnd = new Date(currentWeekEndDate);
    newEnd.setDate(currentWeekEndDate.getDate() + 7);

    setCurrentWeekStartDate(newStart);
    setCurrentWeekEndDate(newEnd);
    setSelectedIndex(0);
  };

  const isPreviousDisabled = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStartDate = new Date(currentWeekStartDate);
    weekStartDate.setHours(0, 0, 0, 0);

    return weekStartDate.getTime() <= today.getTime();
  }, [currentWeekStartDate]);

  const isNextDisabled = useCallback(() => {
    const threeWeeksFromToday = new Date(today);
    threeWeeksFromToday.setDate(today.getDate() + 14); // 3 weeks * 7 days

    return currentWeekEndDate.getTime() >= threeWeeksFromToday.getTime();
  }, [currentWeekEndDate]);

  const fetchStudioClasses = async (studioName, date) => {
    const { data, error } = await supabase
      .from("danceClassStorage")
      .select("class_id,classname,instructor,price,time,length")
      .eq("studio_name", studioName)
      .eq("date", date)
      .order("time", { ascending: true });

    if (!data) {
      return [
        {
          classname: "Error loading classes.",
          instructor: "Try again later.",
          length: "N/A",
          price: "N/A",
          time: "02:00:00",
        },
      ];
    }
    return data;
  };

  const loadClasses = async (date) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const [mdcClasses, tmillyClasses, mlClasses] = await Promise.all([
        fetchStudioClasses("MDC", date),
        fetchStudioClasses("TMILLY", date),
        fetchStudioClasses("ML", date),
      ]);
      setDanceClassMDC(mdcClasses);
      setDanceClassTMILLY(tmillyClasses);
      setDanceClassML(mlClasses);
    } catch (error) {
      console.error(`Error fetching classes: ${error}`);
      setErrorMessage(`Error fetching classes: ${error}, try again later`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 max-md:px-2">
      <Pagination className="mt-5">
        <PaginationContent className="gap-4 max-md:gap-2 bg-gray-300/20 rounded-3xl overflow-x-auto">
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
                className={cn(
                  "w-25 max-md:text-xs whitespace-nowrap",
                  "px-4 max-md:px-2"
                )}
                isActive={index === selectedIndex}
                onClick={() => handleDateClick(index, date)}
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
            onClick={() => !isNextDisabled() && handleNextClick()}
            className={cn(
              "transition-all",
              !isNextDisabled() && "hover:cursor-pointer hover:bg-accent",
              isNextDisabled() && "pointer-events-none opacity-50"
            )}
          />
        </PaginationContent>
      </Pagination>
      <div className="flex justify-center w-full mb-4">
        {isLoading ? <Progress value={progress} className="" /> : null}
      </div>
      <div
        id="class-content"
        className="flex-1 flex justify-center pt-2 w-full min-w-25 overflow-x-auto"
      >
        <ClassScrollBar
          studioName="MDC"
          danceClassList={danceClassMDC}
        ></ClassScrollBar>
        <ClassScrollBar
          studioName="TMILLY"
          danceClassList={danceClassTMILLY}
        ></ClassScrollBar>
        <ClassScrollBar
          studioName="ML"
          danceClassList={danceClassML}
        ></ClassScrollBar>
      </div>
    </div>
  );
};

export default CustomPagination;

/**
 
 */
