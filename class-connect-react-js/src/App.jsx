/* eslint-disable no-unused-vars */
import "./App.css";
import { Button } from "@/components/ui/button";
import Search from "./components/Search.jsx";
import { useDebounce } from "react-use";
import { useState, useEffect } from "react";
import AllPageContent from "./components/AllPageContent";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 750, [searchTerm]);

  return (
    <main className="min-h-screen flex flex-col w-full">
      <div className="text-center p-3 max-md:p-2">
        <p className="text-4xl max-md:text-3xl font-bold">ClassConnect</p>
      </div>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className="text-center"
      />
      <AllPageContent searchTerm={debouncedSearchTerm}></AllPageContent>
      <Toaster
        richColors
        expand={false}
        closeButton={true}
        position="bottom-center"
        duration={3000}
      />
    </main>
  );
};

export default App;
