import { createClient } from "@supabase/supabase-js";
import React from "react";
import { DanceClass } from "../lib/danceclass";

interface TimeRange {
  start: string;
  end: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchStudioClassesBySearchAndTime = async (
  studioName: string,
  searchTerm: string,
  timeRange: TimeRange
): Promise<DanceClass[]> => {
  try {
    let query = supabase
      .from("danceClassStorage")
      .select(
        "class_id,classname,instructor,price,time,length,date,studio_name"
      )
      .eq("studio_name", studioName);

    if (searchTerm && searchTerm.trim() !== "") {
      query = query.or(
        `classname.ilike.%${searchTerm.trim()}%,instructor.ilike.%${searchTerm.trim()}%`
      );
    }

    if (timeRange.start) {
      query = query.gte("time", timeRange.start);
    }
    if (timeRange.end) {
      query = query.lte("time", timeRange.end);
    }

    query = query.order("date", { ascending: true });
    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return [
        {
          class_id: "0",
          classname: "No classes found.",
          instructor: "Try a different search.",
          length: "N/A",
          time: "02:00:00",
          price: 0,
          studio_name: "xxx",
          date: "",
        },
      ];
    }
    return data.map((item: any) => ({
      ...item,
      studio_name: studioName,
    }));
  } catch (error) {
    console.error("Search query error:", error);
    return [
      {
        class_id: "0",
        classname: "Error loading classes.",
        instructor: "Try again later.",
        length: "N/A",
        time: "02:00:00",
        price: 0,
        studio_name: "xxx",
        date: "",
      },
    ];
  }
};

export const fetchStudioClassesByDateAndTime = async (
  studioName: string,
  date: string,
  timeRange: TimeRange
): Promise<DanceClass[]> => {
  try {
    let query = supabase
      .from("danceClassStorage")
      .select("*")
      .eq("studio_name", studioName)
      .eq("date", date);

    if (timeRange.start) {
      query = query.gte("time", timeRange.start);
    }
    if (timeRange.end) {
      query = query.lte("time", timeRange.end);
    }

    query = query.order("time", { ascending: true });

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return [
        {
          class_id: "0",
          classname: "No classes found.",
          instructor: "Try a different date.",
          length: "N/A",
          time: "00:00:00",
          price: 0,
          studio_name: "xxx",
          date: "",
        },
      ];
    }
    return data;
  } catch (error) {
    console.error(`Error fetching classes: ${error}`);
    return [
      {
        class_id: "0",
        classname: "Error loading classes.",
        instructor: "Try again later.",
        length: "N/A",
        time: "00:00:00",
        price: 0,
        studio_name: "xxx",
        date: "",
      },
    ];
  }
};
