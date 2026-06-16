import RepeatButton from "./RepeatButton";
import useStateContext from "../context/useStateContext";

const allDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function DayRepetition() {
  const { dispatch, newTask } = useStateContext();
  const repeat = newTask.repeat || [];
  const selection = {
    once: repeat.length === 0,
    everyday: repeat.length === 7,
    days: new Set(repeat.map((index) => allDays[index])),
  };

  const handleToggle = (role, value) => {
    let nextDays = new Set(selection.days);

    if (role === "once") {
      dispatch({
        type: "updateNewTaskRepeat",
        payload: [],
      });
      return;
    }

    if (role === "everyday") {
      dispatch({
        type: "updateNewTaskRepeat",
        payload: selection.everyday ? [] : [0, 1, 2, 3, 4, 5, 6],
      });
      return;
    }

    if (role === "day") {
      if (nextDays.has(value)) nextDays.delete(value);
      else nextDays.add(value);

      dispatch({
        type: "updateNewTaskRepeat",
        payload: Array.from(nextDays)
          .map((day) => allDays.indexOf(day))
          .sort((a, b) => a - b),
      });
    }
  };

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
