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

const formatDate = (dateString) => {
  const date = new Date(dateString + "T00:00:00");
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const ClassScrollBar = ({ studioName, danceClassList, isSearchTerm }) => (
  <ScrollArea className="w-90 rounded-lg border overflow-hidden">
    <div className="pt-4 pb-4">
      <h4 className="text-sm font-medium leading-none text-center">
        {studioName}
      </h4>
    </div>
    <Separator className="w-full" />
    <div className="p-4">
      {danceClassList?.map((danceClass) => (
        <div key={danceClass.class_id} className="relative mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-sm text-left">
              {formatTime(danceClass.time)}
            </div>
            <div className="text-sm text-right font-medium">
              {danceClass.classname}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-sm text-left text-gray-500">
              {danceClass.length}
            </div>
            <div className="text-sm text-center text-gray-500">
              {isSearchTerm ? formatDate(danceClass.date) : ""}
              {/* {formatDate(danceClass.date)} */}
            </div>
            <div className="text-sm text-right font-semibold text-gray-600">
              {danceClass.instructor}
            </div>
          </div>
          <Separator className="mt-2" />
        </div>
      ))}
    </div>
  </ScrollArea>
);

export default ClassScrollBar;
