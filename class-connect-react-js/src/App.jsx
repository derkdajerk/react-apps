/* eslint-disable no-unused-vars */
import "./App.css";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import ClassScrollBar from "@/components/classScrollBar.jsx";
import CustomPagination from "./components/CustomPagination";
import Search from "./components/Search.jsx";
import { useDebounce } from "react-use";
import { useState, useEffect } from "react";
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

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [danceClassMDC, setDanceClassMDC] = useState([]);
  const [danceClassTMILLY, setDanceClassTMILLY] = useState([]);
  const [danceClassML, setDanceClassML] = useState([]);

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 750, [searchTerm]);

  const loadClasses = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      let { data: danceClassMDC, error: error2 } = await supabase
        .from("danceClassStorage")
        .select("class_id,classname,instructor,price,time,length")
        .eq("studio_name", "MDC")
        .eq("date", "2025-04-19")
        .order("time", { ascending: true });
      if (!danceClassMDC) {
        setDanceClassMDC([
          {
            classname: "Error loading classes.",
            instructor: "Try again later.",
            length: "N/A",
            price: "N/A",
            time: "02:00:00",
          },
        ]);
        throw new Error(`Data came back null: ${JSON.stringify(error2)}`);
      } else setDanceClassMDC(danceClassMDC);
      let { data: danceClassTMILLY, error: error1 } = await supabase
        .from("danceClassStorage")
        .select("class_id,classname,instructor,price,time,length")
        .eq("studio_name", "TMILLY")
        .eq("date", "2025-04-19")
        .order("time", { ascending: true });
      if (!danceClassTMILLY) {
        setDanceClassTMILLY([
          {
            classname: "Error loading classes.",
            instructor: "Try again later.",
            length: "N/A",
            price: "N/A",
            time: "02:00:00",
          },
        ]);
        throw new Error(`Data came back null: ${JSON.stringify(error1)}`);
      } else setDanceClassTMILLY(danceClassTMILLY);
      let { data: danceClassML, error: error3 } = await supabase
        .from("danceClassStorage")
        .select("class_id,classname,instructor,price,time,length")
        .eq("studio_name", "ML")
        .eq("date", "2025-04-19")
        .order("time", { ascending: true });
      if (!danceClassML) {
        setDanceClassML([
          {
            classname: "Error loading classes.",
            instructor: "Try again later.",
            length: "N/A",
            price: "N/A",
            time: "02:00:00",
          },
        ]);
        throw new Error(`Data came back null: ${JSON.stringify(error3)}`);
      } else setDanceClassML(danceClassML);
    } catch (error) {
      console.error(`Error fetching classes : ${error}`);
      setErrorMessage(`Error fetching classes : ${error}, try again later`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

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
        {/* {isLoading ? <Spinner />} */}
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
