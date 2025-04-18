/* eslint-disable no-unused-vars */
import "./App.css";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import ClassScrollBar from "@/components/classScrollBar.jsx";
import CustomPagination from "./components/CustomPagination";
import Search from "./components/Search.jsx";
import { useDebounce } from "react-use";
import { useState } from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? null;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? null;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

let { data: danceClassTMILLY, error: error1 } = await supabase
  .from("danceClassStorage")
  .select("classname,instructor,price,time,length")
  .eq("studio_name", "TMILLY")
  .eq("date", "2025-04-14")
  .order("time", { ascending: true });

if (!danceClassTMILLY) {
  throw new Error(`Data came back null: ${JSON.stringify(error1)}`);
}
let { data: danceClassMDC, error: error2 } = await supabase
  .from("danceClassStorage")
  .select("classname,instructor,price,time,length")
  .eq("studio_name", "MDC")
  .eq("date", "2025-04-14")
  .order("time", { ascending: true });

if (!danceClassMDC) {
  throw new Error(`Data came back null: ${JSON.stringify(error2)}`);
}

let { data: danceClassML, error: error3 } = await supabase
  .from("danceClassStorage")
  .select("classname,instructor,price,time,length")
  .eq("studio_name", "ML")
  .eq("date", "2025-04-14")
  .order("time", { ascending: true });

if (!danceClassML) {
  throw new Error(`Data came back null: ${JSON.stringify(error3)}`);
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 750, [searchTerm]);

  return (
    <main className="h-screen flex flex-col">
      <div className="text-center p-2">
        <p className="">Hello welcome to ClassConnect!</p>
      </div>
      <div id="navbar" className="text-center">
        <Button
          className="bg-gradient-to-t from-gray-800 to-red-800"
          size="xlg"
        >
          MDC
        </Button>
        <Button
          className="bg-gradient-to-t from-red-800 to-gray-800"
          size="xlg"
        >
          TMILLY
        </Button>
        <Button
          className="bg-gradient-to-t from-green-800 to-gray-600"
          size="xlg"
        >
          ML
        </Button>
      </div>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className="text-center"
      />
      <CustomPagination></CustomPagination>
      <div
        id="class-content"
        className="flex-1 flex justify-center pt-2 overflow-hidden"
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
    </main>
  );
};

export default App;
