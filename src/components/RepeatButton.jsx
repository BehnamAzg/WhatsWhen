export default function RepeatButton({
  text = "",
  role = "",
  value = "",
  isChecked = false,
}) {
  return (
    <label className="focus-within:ring-primary cursor-pointer rounded-full focus-within:ring-2">
      <input
        type="checkbox"
        name="repeat"
        className="peer sr-only"
        data-role={role}
        {...(isChecked ? { defaultChecked: true } : {})}
        defaultValue={value}
      />
      <span className="day-select"> {text} </span>
    </label>
  );
}
