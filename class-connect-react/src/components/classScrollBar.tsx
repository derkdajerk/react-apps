import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";

const classScrollBar = ({ studioName, danceClassList }) => {
  return (
    <ScrollArea className="w-80 rounded-lg border">
      <div className="pt-4 pb-4">
        <h4 className=" text-sm font-medium leading-none text-center">
          {studioName}
        </h4>
      </div>
      <Separator className="w-full"></Separator>
      <div className="p-4">
        {danceClassList.map((danceClass, index) => (
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
              <div className="text-sm text-right">{danceClass.classname}</div>
              <div className="text-sm text-left">{danceClass.length}</div>
              <div className="text-sm text-right">{danceClass.instructor}</div>
            </div>
            <Separator className="mt-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default classScrollBar;
