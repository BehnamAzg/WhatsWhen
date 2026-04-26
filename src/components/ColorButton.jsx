export default function ColorButton({ value = "", isChecked = false, classList = "" }) {
  return (
    <label className="focus-within:ring-2 focus-within:ring-primary rounded-full">
      <input type="radio" name="color" defaultValue={value} className="sr-only peer" {...(isChecked ? { defaultChecked: true } : {})} />
      <span className={`color-dot focus:outline-none ${classList}`} tabIndex="0"></span>
    </label>
  );
}
