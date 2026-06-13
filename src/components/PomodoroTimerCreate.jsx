import PomodoroTimerInput from "./PomodoroTimerInput";

export default function PomodoroTimerCreate() {
  return (
    <div className="flex-center border-light-border dark:border-dark-border bg-blur h-full w-full flex-col gap-1.5 rounded-2xl border p-2 text-sm font-semibold text-black/70">
      <div className="flex-center w-full flex-col gap-1.5 text-nowrap">
        {/* <div className="bg-background flex-center aspect-square h-8 gap-1 rounded-2xl border border-white text-center text-xs text-black/40">
          1
        </div> */}

        <div className="form-container-pomodoro">
          <span className="w-1/4 text-left">Cycles:</span>
          <PomodoroTimerInput value="4" />
          <span className="dark:text-dark-theme-text/50 text-black/40">
            Cycles
          </span>
        </div>

        <div className="form-container-pomodoro">
          <span className="w-1/4 text-left">Focus Time:</span>
          <PomodoroTimerInput value="25" />
          <span className="dark:text-dark-theme-text/50 text-black/40">
            Minutes
          </span>
        </div>

        <div className="form-container-pomodoro">
          <span className="w-1/4 text-left">Short Break:</span>
          <PomodoroTimerInput value="5" />
          <span className="dark:text-dark-theme-text/50 text-black/40">
            Minutes
          </span>
        </div>

        <div className="form-container-pomodoro">
          <span className="w-1/4 text-left">Long Break:</span>
          <PomodoroTimerInput value="15" />
          <span className="dark:text-dark-theme-text/50 text-black/40">
            Minutes
          </span>
        </div>
      </div>
    </div>
  );
}
