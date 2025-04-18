import "./App.css";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? null;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? null;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

let { data: danceClass, error: error1 } = await supabase
  .from("danceClassStorage")
  .select("classname,instructor,price,time,length")
  .eq("studio_name", "TMILLY")
  .eq("date", "2025-04-14")
  .order("time", { ascending: true });

if (!danceClass) {
  throw new Error(`Data came back null: ${JSON.stringify(error1)}`);
}
let { data: danceClass2, error: error2 } = await supabase
  .from("danceClassStorage")
  .select("classname,instructor,price,time,length")
  .eq("studio_name", "MDC")
  .eq("date", "2025-04-14")
  .order("time", { ascending: true });

if (!danceClass2) {
  throw new Error(`Data came back null: ${JSON.stringify(error2)}`);
}

let { data: danceClass3, error: error3 } = await supabase
  .from("danceClassStorage")
  .select("classname,instructor,price,time,length")
  .eq("studio_name", "ML")
  .eq("date", "2025-04-14")
  .order("time", { ascending: true });

if (!danceClass3) {
  throw new Error(`Data came back null: ${JSON.stringify(error3)}`);
}

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
            {danceClass2.map((danceClass, index) => (
              <div key={`${index}`} className="relative mb-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm text-left">
                    {danceClass.time[0] + danceClass.time[1] > 12
                      ? danceClass.time[0] +
                        danceClass.time[1] -
                        12 +
                        danceClass.time[2] +
                        danceClass.time[3] +
                        danceClass.time[4] +
                        " PM"
                      : danceClass.time[0] +
                        danceClass.time[1] +
                        danceClass.time[2] +
                        danceClass.time[3] +
                        danceClass.time[4] +
                        " AM"}
                  </div>
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
        <ScrollArea className="w-80 rounded-lg border">
          <div className="pt-4 pb-4">
            <h4 className=" text-sm font-medium leading-none text-center">
              TMILLY
            </h4>
          </div>
          <Separator className="w-full"></Separator>
          <div className="p-4">
            {danceClass.map((danceClass, index) => (
              <div key={`${index}`} className="relative mb-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm text-left">
                    {danceClass.time[0] + danceClass.time[1] > 12
                      ? danceClass.time[0] +
                        danceClass.time[1] -
                        12 +
                        danceClass.time[2] +
                        danceClass.time[3] +
                        danceClass.time[4] +
                        " PM"
                      : danceClass.time[0] +
                        danceClass.time[1] +
                        danceClass.time[2] +
                        danceClass.time[3] +
                        danceClass.time[4] +
                        " AM"}
                  </div>
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
        <ScrollArea className="w-80 rounded-lg border">
          <div className="pt-4 pb-4">
            <h4 className=" text-sm font-medium leading-none text-center">
              ML
            </h4>
          </div>
          <Separator className="w-full"></Separator>
          <div className="p-4">
            {danceClass3.map((danceClass, index) => (
              <div key={`${index}`} className="relative mb-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm text-left">
                    {danceClass.time[0] + danceClass.time[1] > 12
                      ? danceClass.time[0] +
                        danceClass.time[1] -
                        12 +
                        danceClass.time[2] +
                        danceClass.time[3] +
                        danceClass.time[4] +
                        " PM"
                      : danceClass.time[0] +
                        danceClass.time[1] +
                        danceClass.time[2] +
                        danceClass.time[3] +
                        danceClass.time[4] +
                        " AM"}
                  </div>
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
