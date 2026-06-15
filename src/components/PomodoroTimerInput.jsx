export default function PomodoroTimerInput({ name, value = 0, onChange }) {
  return (
    <input
      name={name}
      type="number"
      defaultValue={value}
      className="form-input-pomodoro appearance-none "
      onChange={(e) => onChange(e)}
    />
  );
}
