export default function RepeatButton({ text, role, value, checked, onChange }) {
  return (
    <label className="focus-within:ring-primary cursor-pointer rounded-full focus-within:ring-2">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={() => onChange(role, value)}
      />
      <span className="day-select"> {text} </span>
    </label>
  );
}
