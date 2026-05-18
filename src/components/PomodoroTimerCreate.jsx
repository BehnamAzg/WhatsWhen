import PomodoroTimerInput from "./PomodoroTimerInput";

export default function PomodoroTimerCreate() {
  return (
    <div className="flex-center h-full w-full flex-col gap-1.5 rounded-2xl border border-white bg-white/20 p-2 text-sm font-semibold text-black/70">
      <div className="flex-center w-full gap-1.5">
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
