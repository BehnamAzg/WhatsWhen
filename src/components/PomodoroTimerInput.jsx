export default function PomodoroTimerInput({ value = "" }) {
  return (
    <input
      name="pomodoro"
      type="number"
      defaultValue={value}
      className="form-input-pomodoro appearance-none"
      
    />
  );
}
