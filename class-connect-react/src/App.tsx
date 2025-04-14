import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  SeparatorHorizontal,
  SeparatorHorizontalIcon,
  SeparatorVertical,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? null;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? null;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

let { data: danceClass, error } = await supabase
  .from("danceClassStorage")
  .select("classname,instructor,price,time,length")
  .eq("studio_name", "MDC")
  .eq("date", "2025-04-10")
  .order("time", { ascending: true });

if (!danceClass) {
  throw new Error("Data came back null");
}
// danceClass.map((danceClass) => {
//   console.log(danceClass.classname, danceClass.instructor);
// });

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const App = () => {
  return (
    <main className="h-screen flex flex-col">
      <div className="text-center p-2">
        <p className="">Hello welcome to ClassConnect!</p>
      </div>
      <div id="navbar" className="text-center">
        <Button className="bg-red-800" size="xlg">
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
      <div
        id="class-content"
        className="flex-1 flex justify-center pt-2 overflow-hidden"
      >
        <ScrollArea className="w-80 rounded-lg border">
          <div className="pt-4 pb-4">
            <h4 className=" text-sm font-medium leading-none text-center">
              MDC
            </h4>
          </div>
          <Separator className="w-full"></Separator>
          <div className="p-4">
            {danceClass.map((danceClass, index) => (
              <div key={`${index}`} className="relative mb-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm text-left">{danceClass.time}</div>
                  <div className="text-sm text-right">
                    {danceClass.classname}
                  </div>
                  <div className="text-sm text-left">{danceClass.length}</div>
                  <div className="text-sm text-right">
                    {danceClass.instructor}
                  </div>
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
};
export default App;
