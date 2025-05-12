import { Checkbox } from "./ui/checkbox";

const classList = ["MDC", "TMILLY", "ML", "PLAYGROUND", "EIGHTYEIGHT"];

export default function ClassCheckBoxes({ onVisibilityChange }) {
  return (
    // want to make check boxes bigger when on phone so classname="max-sm:text-lg"
    <div className="grid grid-cols-6 gap-4 mt-5">
      {classList.map((studioName, idx) => (
        <div
          key={studioName}
          className={`flex items-center space-x-2 ${
            idx < 3 ? "col-span-2" : "col-span-3"
          }`}
        >
          <Checkbox
            id={studioName}
            defaultChecked={idx < 3}
            onCheckedChange={(checked) =>
              onVisibilityChange(studioName, checked)
            }
          />
          <label
            htmlFor={studioName}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {studioName}
          </label>
        </div>
      ))}
    </div>
  );
}
