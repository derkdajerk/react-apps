import { createClient } from "@supabase/supabase-js";
import React from "react";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? null;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? null;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchStudioClassesBySearchAndTime = async (
  studioName,
  searchTerm,
  timeRange
) => {
  try {
    let query = supabase
      .from("danceClassStorage")
      .select("class_id,classname,instructor,price,time,length,date")
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
          classname: "No classes found.",
          instructor: "Try a different search.",
          length: "N/A",
          price: "N/A",
          time: "02:00:00",
        },
      ];
    }
    return data;
  } catch (error) {
    console.error("Search query error:", error);
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
};

export const fetchStudioClassesByDateAndTime = async (
  studioName,
  date,
  timeRange
) => {
  let query = supabase
    .from("danceClassStorage")
    .select("*")
    .eq("studio_name", studioName)
    .eq("date", date);

  // Add time range filtering if provided
  if (timeRange.start) {
    query = query.gte("time", timeRange.start);
  }
  if (timeRange.end) {
    query = query.lte("time", timeRange.end);
  }

  query = query.order("time", { ascending: true });

  const { data, error } = await query;
  if (error) {
    console.error(`Error finding teacher: ${error}`);
  }
  if (!data) {
    return [
      {
        classname: "Error loading classes.",
        instructor: "Try again later.",
        length: "N/A",
        price: "N/A",
        time: "00:00:00",
      },
    ];
  }
  return data;
};
