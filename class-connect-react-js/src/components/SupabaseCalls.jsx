import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? null;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? null;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchStudioClassesBySearch = async (studioName, searchTerm) => {
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

export const fetchStudioClassesByDate = async (studioName, date) => {
  const { data, error } = await supabase
    .from("danceClassStorage")
    .select("class_id,classname,instructor,price,time,length,date")
    .eq("studio_name", studioName)
    .eq("date", date)
    .order("time", { ascending: true });

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
