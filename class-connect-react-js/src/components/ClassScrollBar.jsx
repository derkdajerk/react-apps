import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";

const formatTime = (time) => {
  const hours = parseInt(time.slice(0, 2));
  return hours > 12
    ? `${hours - 12}${time.slice(2, 5)} PM`
    : hours === 12
    ? `${hours}${time.slice(2, 5)} PM`
    : hours < 10
    ? `${hours}${time.slice(2, 5)} AM`
    : `${hours}${time.slice(2, 5)} AM`;
};

const ClassScrollBar = ({ studioName, danceClassList }) => {
  return (
    <ScrollArea className="w-100 rounded-lg border overflow-hidden">
      <div className="pt-4 pb-4">
        <h4 className=" text-sm font-medium leading-none text-center">
          {studioName}
        </h4>
      </div>
      <Separator className="w-full"></Separator>
      <div className="p-4">
        {danceClassList?.map((danceClass) => (
          <div key={`${danceClass.class_id}`} className="relative mb-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm text-left">
                {formatTime(danceClass.time)}
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

export default ClassScrollBar;
