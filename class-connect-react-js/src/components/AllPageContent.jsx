/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useMemo } from "react";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import DateNavigation from "./DateNavigation";
import ClassContent from "./ClassContent";
import {
  fetchStudioClassesBySearch,
  fetchStudioClassesByDate,
} from "./SupabaseCalls";
import { TimeRangeSelector } from "./TimeRangeSelector";

const AllPageContent = ({ searchTerm }) => {
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 6);

  const [dates, setDates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(today);
  const [currentWeekEndDate, setCurrentWeekEndDate] = useState(endOfWeek);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [danceClassMDC, setDanceClassMDC] = useState([]);
  const [danceClassTMILLY, setDanceClassTMILLY] = useState([]);
  const [danceClassML, setDanceClassML] = useState([]);
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });

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

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentWeekStartDate);
      date.setDate(currentWeekStartDate.getDate() + i);
      return date;
    });
  }, [currentWeekStartDate]);

  useEffect(() => {
    setDates(weekDates);
  }, [weekDates]);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      if (dates.length > 0 && dates[selectedIndex]) {
        const localDate = new Date(dates[selectedIndex]);
        const formattedDate = localDate.toLocaleDateString("en-CA");
        // debugging
        // console.log("Local date:", localDate);
        // console.log("Formatted date:", formattedDate);

        loadClassesByDate(formattedDate);
      }
    } else {
      loadClassesBySearch(searchTerm);
    }
  }, [selectedIndex, dates, searchTerm]);

  const handleDateClick = (index) => {
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

  const loadClassesBySearch = async (searchTerm) => {
    setIsLoading(true);
    try {
      const [mdcClasses, tmillyClasses, mlClasses] = await Promise.all([
        fetchStudioClassesBySearch("MDC", searchTerm),
        fetchStudioClassesBySearch("TMILLY", searchTerm),
        fetchStudioClassesBySearch("ML", searchTerm),
      ]);
      setDanceClassMDC(mdcClasses);
      setDanceClassTMILLY(tmillyClasses);
      setDanceClassML(mlClasses);
    } catch (error) {
      console.error(`Error finding teacher: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadClassesByDate = async (date) => {
    setIsLoading(true);
    try {
      const [mdcClasses, tmillyClasses, mlClasses] = await Promise.all([
        fetchStudioClassesByDate("MDC", date),
        fetchStudioClassesByDate("TMILLY", date),
        fetchStudioClassesByDate("ML", date),
      ]);
      setDanceClassMDC(mdcClasses);
      setDanceClassTMILLY(tmillyClasses);
      setDanceClassML(mlClasses);
    } catch (error) {
      console.error(`Error fetching classes: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeChange = ({ start, end }) => {
    setTimeRange({ start, end });
  };

  useEffect(() => {
    if (timeRange.start && timeRange.end) {
      // If we have both times, reload classes with time filter
      if (searchTerm) {
        loadClassesBySearch(searchTerm);
      } else if (dates.length > 0 && dates[selectedIndex]) {
        const formattedDate = dates[selectedIndex].toLocaleDateString("en-CA");
        loadClassesByDate(formattedDate);
      }
    }
  }, [timeRange]);

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 max-md:px-2">
      <Pagination className="mt-5">
        <DateNavigation
          dates={dates}
          selectedIndex={selectedIndex}
          onDateClick={handleDateClick}
          onPrevious={handlePreviousClick}
          onNext={handleNextClick}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
        />
      </Pagination>

      <div id="timeboxes" className="mt-4">
        <TimeRangeSelector onTimeChange={handleTimeChange} />
      </div>

      <div className="flex justify-center w-full mb-4">
        {isLoading && <Progress value={progress} />}
      </div>

      <ClassContent
        danceClassMDC={danceClassMDC}
        danceClassTMILLY={danceClassTMILLY}
        danceClassML={danceClassML}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default AllPageContent;
