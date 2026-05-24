import { useState } from "react";
import RepeatButton from "./RepeatButton";

export default function DayRepetition() {
  const [selection, setSelection] = useState({
    once: true,
    everyday: false,
    days: new Set(),
  });

  const handleToggle = (role, value) => {
    const allDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    setSelection((prev) => {
      let nextOnce = prev.once;
      let nextEveryday = prev.everyday;
      let nextDays = new Set(prev.days);

      // 1. Handle Role Logic
      if (role === "once") {
        return { once: true, everyday: false, days: new Set() };
      }

      if (role === "everyday") {
        nextEveryday = !prev.everyday;
        nextDays = nextEveryday ? new Set(allDays) : new Set();
        nextOnce = false;
      } else if (role === "day") {
        // Toggle individual day
        if (nextDays.has(value)) nextDays.delete(value);
        else nextDays.add(value);

        // Check if all are selected
        nextEveryday = allDays.every((d) => nextDays.has(d));
        nextOnce = false;
      }

      // 2. The "Nothing Selected" safeguard
      // If nothing is checked, default back to "Once"
      const isNothingSelected = !nextEveryday && nextDays.size === 0;

      if (isNothingSelected) {
        return { once: true, everyday: false, days: new Set() };
      }

      return { once: nextOnce, everyday: nextEveryday, days: nextDays };
    });
  };

  /*
  A note on Data Integrity
  Since you are using a Set for days, keep in mind that Set objects are not directly JSON-serializable. When you are ready to send this data to your server or save it, convert it to an array:

  const payload = {
    ...selection,
    days: Array.from(selection.days) // Convert Set to Array for API/Storage
  };
  */

  return (
    <div className="flex w-full flex-wrap items-stretch gap-2 rounded-2xl border border-white bg-white/50 px-4 py-2.5 text-xs text-neutral-500 select-none">
      <h3 className="flex-center mr-1 text-sm text-neutral-500">Repeat</h3>

      <RepeatButton
        text="Once"
        role="once"
        checked={selection.once}
        onChange={handleToggle}
      />
      <RepeatButton
        text="Every Day"
        role="everyday"
        checked={selection.everyday}
        onChange={handleToggle}
      />
      {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
        <RepeatButton
          key={day}
          text={day.charAt(0).toUpperCase() + day.slice(1)}
          role="day"
          value={day}
          checked={selection.days.has(day)}
          onChange={handleToggle}
        />
      ))}
    </div>
  );
}
