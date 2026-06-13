import { useEffect, useState } from "react";
import RepeatButton from "./RepeatButton";
import useStateContext from "../context/useStateContext";

const allDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function DayRepetition() {
  const { dispatch } = useStateContext();

  const [selection, setSelection] = useState({
    once: true,
    everyday: false,
    days: new Set(),
  });

  const handleToggle = (role, value) => {
    setSelection((prev) => {
      let nextOnce = prev.once;
      let nextEveryday = prev.everyday;
      let nextDays = new Set(prev.days);

      if (role === "once") {
        return { once: true, everyday: false, days: new Set() };
      }

      if (role === "everyday") {
        nextEveryday = !prev.everyday;
        nextDays = nextEveryday ? new Set(allDays) : new Set();
        nextOnce = false;
      }

      if (role === "day") {
        if (nextDays.has(value)) nextDays.delete(value);
        else nextDays.add(value);

        nextEveryday = allDays.every((d) => nextDays.has(d));
        nextOnce = false;
      }

      const isNothingSelected = !nextEveryday && nextDays.size === 0;

      if (isNothingSelected)
        return { once: true, everyday: false, days: new Set() };

      return { once: nextOnce, everyday: nextEveryday, days: nextDays };
    });
  };

  useEffect(() => {
    dispatch({
      type: "updateNewTaskRepeat",
      payload: Array.from(selection.days)
        ?.map((day) => allDays.indexOf(day))
        .sort((a, b) => a - b),
    });
  }, [selection, dispatch]);

  return (
    <div className="border-light-border dark:border-dark-border bg-blur flex w-full flex-wrap items-stretch gap-2 rounded-2xl border px-4 py-2.5 text-xs text-neutral-600 select-none">
      <h3 className="flex-center dark:text-dark-theme-text/50 mr-1 text-xs text-neutral-500">
        Repeat
      </h3>

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
      {allDays.map((day) => (
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
