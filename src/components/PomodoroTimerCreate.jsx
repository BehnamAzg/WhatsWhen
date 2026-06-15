import { useState, useEffect } from "react";
import PomodoroTimerInput from "./PomodoroTimerInput";
import useStateContext from "../context/useStateContext";

export default function PomodoroTimerCreate() {
  const { dispatch } = useStateContext();
  const [pomodoroOptions, setPomodoroOption] = useState({
    cycle: 4,
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPomodoroOption((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  }

  useEffect(() => {
    dispatch({ type: "updateNewTaskPomodoro", payload: pomodoroOptions });
  }, [pomodoroOptions, dispatch]);

  return (
    <div className="flex-center border-light-border dark:border-dark-border bg-blur h-full w-full flex-col gap-1.5 rounded-2xl border p-2 text-sm font-semibold text-black/70">
      <div className="flex-center w-full flex-col gap-1.5 text-nowrap">
        {/* <div className="bg-background flex-center aspect-square h-8 gap-1 rounded-2xl border border-white text-center text-xs text-black/40">
          1
        </div> */}

        <div className="form-container-pomodoro">
          <span className="w-1/4 text-left">Cycles:</span>
          <PomodoroTimerInput
            value={pomodoroOptions.cycle}
            name="cycle"
            onChange={handleInputChange}
          />
          <span className="dark:text-dark-theme-text/50 text-black/40">
            Cycles
          </span>
        </div>

        <div className="form-container-pomodoro">
          <span className="w-1/4 text-left">Focus Time:</span>
          <PomodoroTimerInput
            value={pomodoroOptions.focus}
            name="focus"
            onChange={handleInputChange}
          />
          <span className="dark:text-dark-theme-text/50 text-black/40">
            Minutes
          </span>
        </div>

        <div className="form-container-pomodoro">
          <span className="w-1/4 text-left">Short Break:</span>
          <PomodoroTimerInput
            value={pomodoroOptions.shortBreak}
            name="shortBreak"
            onChange={handleInputChange}
          />
          <span className="dark:text-dark-theme-text/50 text-black/40">
            Minutes
          </span>
        </div>

        <div className="form-container-pomodoro">
          <span className="w-1/4 text-left">Long Break:</span>
          <PomodoroTimerInput
            value={pomodoroOptions.longBreak}
            name="longBreak"
            onChange={handleInputChange}
          />
          <span className="dark:text-dark-theme-text/50 text-black/40">
            Minutes
          </span>
        </div>
      </div>
    </div>
  );
}
