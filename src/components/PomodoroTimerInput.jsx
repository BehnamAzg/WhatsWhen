export default function PomodoroTimerInput({ value = "" }) {
  return (
    <input
      name="pomodoro"
      type="text"
      defaultValue={value}
      inputMode="numeric"
      pattern="[0-9]{2}:[0-9]{2}"
      placeholder="MM:SS"
      className="form-input-pomodoro w-full "
    />
  );
}
