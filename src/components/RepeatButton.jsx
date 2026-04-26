export default function RepeatButton({ text = "", role = "", value = "", isChecked = false }) {
  return (
    <label className="cursor-pointer focus-within:ring-2 focus-within:ring-primary rounded-full">
      <input type="checkbox" name="repeat" className="sr-only peer" data-role={role} {...(isChecked ? { defaultChecked: true } : {})} defaultValue={value} />
      <span className="day-select"> {text} </span>
    </label>
  );
}
