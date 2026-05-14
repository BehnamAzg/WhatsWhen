export default function ColorButton({
  value = "",
  isChecked = false,
  classList = "",
}) {
  return (
    <label className="focus-within:ring-primary rounded-full focus-within:ring-2">
      <input
        type="radio"
        name="color"
        defaultValue={value}
        className="peer sr-only"
        defaultChecked={isChecked}
      />
      <span
        className={`color-dot focus:outline-none ${classList}`}
        tabIndex="0"
      ></span>
    </label>
  );
}
