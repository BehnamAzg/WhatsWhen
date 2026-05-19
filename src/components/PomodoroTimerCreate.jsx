import PomodoroTimerInput from "./PomodoroTimerInput";

export default function PomodoroTimerCreate() {
  return (
    <div className="flex-center h-full w-full flex-col gap-1.5 rounded-2xl border border-white bg-white/20 p-2 text-sm font-semibold text-black/70">
      <div className="flex-center w-full gap-1.5">
        <div className="bg-background flex-center aspect-square h-8 gap-1 rounded-2xl border border-white text-center text-xs text-black/40">
          1
        </div>

        <div className="form-container-pomodoro">
          <span>Work:</span>
          <PomodoroTimerInput value="25" />
          <span>min</span>
        </div>

        <div className="form-container-pomodoro">
          <span>Rest:</span>
          <PomodoroTimerInput value="5" />
          <span>min</span>
        </div>
      </div>

      <div className="flex-center w-full gap-1.5">
        <div className="bg-background flex-center aspect-square h-8 gap-1 rounded-2xl border border-white text-center text-xs text-black/40">
          2
        </div>

        <div className="form-container-pomodoro">
          <span>Work:</span>
          <PomodoroTimerInput value="25" />
          <span>min</span>
        </div>

        <div className="form-container-pomodoro">
          <span>Rest:</span>
          <PomodoroTimerInput value="5" />
          <span>min</span>
        </div>
      </div>

      <div className="flex-center w-full gap-1.5">
        <div className="bg-background flex-center aspect-square h-8 gap-1 rounded-2xl border border-white text-center text-xs text-black/40">
          3
        </div>

        <div className="form-container-pomodoro">
          <span>Work:</span>
          <PomodoroTimerInput value="25" />
          <span>min</span>
        </div>

        <div className="form-container-pomodoro">
          <span>Rest:</span>
          <PomodoroTimerInput value="5" />
          <span>min</span>
        </div>
      </div>

      <div className="flex-center w-full gap-1.5">
        <div className="bg-background flex-center aspect-square h-8 gap-1 rounded-2xl border border-white text-center text-xs text-black/40">
          4
        </div>

        <div className="form-container-pomodoro">
          <span>Work:</span>
          <PomodoroTimerInput value="25" />
          <span>min</span>
        </div>

        <div className="form-container-pomodoro">
          <span>Rest:</span>
          <PomodoroTimerInput value="15" />
          <span>min</span>
        </div>
      </div>
    </div>
  );
}
