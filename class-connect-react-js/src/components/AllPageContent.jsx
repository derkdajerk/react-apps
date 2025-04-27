/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useMemo } from "react";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import DateNavigation from "./DateNavigation";
import ClassContent from "./ClassContent";
import {
  fetchStudioClassesBySearchAndTime,
  fetchStudioClassesByDateAndTime,
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
  const [danceClassEIGHTYEIGHT, setDanceClassEIGHTYEIGHT] = useState([]);
  const [danceClassPLAYGROUND, setDanceClassPLAYGROUND] = useState([]);
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
    // Only proceed if the time range is complete (both selected or both cleared).
    if (
      (timeRange.start && timeRange.end) ||
      (timeRange.start === "" && timeRange.end === "")
    ) {
      if (searchTerm && searchTerm.trim() !== "") {
        loadClassesBySearchAndTime(searchTerm, timeRange);
      } else if (dates.length > 0 && dates[selectedIndex]) {
        const formattedDate = formatDate(dates[selectedIndex]);
        loadClassesByDateAndTime(formattedDate, timeRange);
      }
    }
  }, [timeRange, searchTerm, dates, selectedIndex]);

  const formatDate = (date) => {
    const localDate = new Date(date);
    return localDate.toLocaleDateString("en-CA");
  };

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

  const loadClassesBySearchAndTime = async (searchTerm) => {
    setIsLoading(true);
    try {
      const [
        mdcClasses,
        tmillyClasses,
        mlClasses,
        eightyeightClasses,
        playgroundClasses,
      ] = await Promise.all([
        fetchStudioClassesBySearchAndTime("MDC", searchTerm, timeRange),
        fetchStudioClassesBySearchAndTime("TMILLY", searchTerm, timeRange),
        fetchStudioClassesBySearchAndTime("ML", searchTerm, timeRange),
        fetchStudioClassesBySearchAndTime("EIGHTYEIGHT", searchTerm, timeRange),
        fetchStudioClassesBySearchAndTime("PLAYGROUND", searchTerm, timeRange),
      ]);
      setDanceClassMDC(mdcClasses);
      setDanceClassTMILLY(tmillyClasses);
      setDanceClassML(mlClasses);
      setDanceClassEIGHTYEIGHT(eightyeightClasses);
      setDanceClassPLAYGROUND(playgroundClasses);
    } catch (error) {
      console.error(`Error finding teacher: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadClassesByDateAndTime = async (date) => {
    setIsLoading(true);
    try {
      const [
        mdcClasses,
        tmillyClasses,
        mlClasses,
        eightyeightClasses,
        playgroundClasses,
      ] = await Promise.all([
        fetchStudioClassesByDateAndTime("MDC", date, timeRange),
        fetchStudioClassesByDateAndTime("TMILLY", date, timeRange),
        fetchStudioClassesByDateAndTime("ML", date, timeRange),
        fetchStudioClassesByDateAndTime("EIGHTYEIGHT", date, timeRange),
        fetchStudioClassesByDateAndTime("PLAYGROUND", date, timeRange),
      ]);
      setDanceClassMDC(mdcClasses);
      setDanceClassTMILLY(tmillyClasses);
      setDanceClassML(mlClasses);
      setDanceClassEIGHTYEIGHT(eightyeightClasses);
      setDanceClassPLAYGROUND(playgroundClasses);
    } catch (error) {
      console.error(`Error fetching classes: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeChange = ({ start, end }) => {
    setTimeRange({ start, end });
    console.log(`start: ${start} end: ${end}`);

    // Only reload if both times are set or both are cleared
    if ((start && end) || (start === "" && end === "")) {
      if (searchTerm) {
        loadClassesBySearchAndTime(searchTerm);
      } else if (dates.length > 0 && dates[selectedIndex]) {
        const formattedDate = dates[selectedIndex].toLocaleDateString("en-CA");
        loadClassesByDateAndTime(formattedDate);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto px-4 max-md:px-2">
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

      <div className="flex justify-center w-full mb-2">
        {isLoading && <Progress value={progress} />}
      </div>

      <ClassContent
        danceClassMDC={danceClassMDC}
        danceClassTMILLY={danceClassTMILLY}
        danceClassML={danceClassML}
        danceClassEIGHTYEIGHT={danceClassEIGHTYEIGHT}
        danceClassPLAYGROUND={danceClassPLAYGROUND}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default AllPageContent;
