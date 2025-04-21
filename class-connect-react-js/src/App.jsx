/* eslint-disable no-unused-vars */
import "./App.css";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

import CustomPagination from "./components/CustomPagination";
import Search from "./components/Search.jsx";
import { useDebounce } from "react-use";
import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 750, [searchTerm]);

  return (
    <main className="min-h-screen flex flex-col w-full">
      <div className="text-center p-6 max-md:p-2">
        <p className="text-lg max-md:text-sm">Hello welcome to ClassConnect!</p>
      </div>
      <div
        id="navbar"
        className="text-center flex justify-center gap-6 w-full overflow-x-auto max-md:gap-2 max-md:p-2"
      >
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
      <CustomPagination searchTerm={debouncedSearchTerm}></CustomPagination>
      {/* <div id="temp-show" className="text-center">
        <p>Only showing April 19th classes below, hardcoded right now.</p>
      </div> */}
    </main>
  );
};

export default App;
