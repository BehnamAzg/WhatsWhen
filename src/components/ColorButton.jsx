import useStateContext from "../context/useStateContext";

export default function ColorButton({
  value = "",
  isChecked = false,
  classList = "",
}) {
  const { dispatch } = useStateContext();

  return (
    <label className="focus-within:ring-primary rounded-full focus-within:ring-2">
      <input
        type="radio"
        name="color"
        value={value}
        className="peer sr-only"
        checked={isChecked}
        onChange={(e) =>
          dispatch({ type: "updateNewTaskColor", payload: e.target.value })
        }
      />
      <span
        className={`color-dot focus:outline-none ${classList}`}
        tabIndex="-1"
      ></span>
    </label>
  );
}
