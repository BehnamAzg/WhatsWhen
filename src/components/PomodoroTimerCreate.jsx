import PomodoroTimerInput from "./PomodoroTimerInput";

export default function PomodoroTimerCreate() {
  return (
    <div className="flex-center h-full w-full flex-col gap-1.5 rounded-2xl border border-white p-2 text-base font-semibold text-black/70">
      <div className="flex-center w-full gap-1.5">
        <div className="form-input-pomodoro flex-center w-1/5 text-black/40">
          1
        </div>
        <PomodoroTimerInput value="25:00" />
        <PomodoroTimerInput value="05:00" />
      </div>
      <div className="flex-center w-full gap-1.5">
        <div className="form-input-pomodoro flex-center w-1/5 text-black/40">
          2
        </div>
        <PomodoroTimerInput value="25:00" />
        <PomodoroTimerInput value="05:00" />
      </div>
      <div className="flex-center w-full gap-1.5">
        <div className="form-input-pomodoro flex-center w-1/5 text-black/40">
          3
        </div>
        <PomodoroTimerInput value="25:00" />
        <PomodoroTimerInput value="05:00" />
      </div>
      <div className="flex-center w-full gap-1.5">
        <div className="form-input-pomodoro flex-center w-1/5 p-0 text-black/40">
          4
        </div>
        <PomodoroTimerInput value="25:00" />
        <PomodoroTimerInput value="15:00" />
      </div>
    </div>
  );
}
