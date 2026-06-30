import { useRef, useState } from "react";
import useStateContext from "../context/useStateContext";
import { isLight } from "../utils/color";
import ColorButton from "./ColorButton";
import Icon from "./Icon";

export default function ColorSelection() {
  const { dispatch, newTask, preferences } = useStateContext();
  const [customColor, setCustomColor] = useState(newTask.color);
  const colorRef = useRef(null);

  const presetColors = [
    "#ffffff",
    "#fca5a5",
    "#fdba74",
    "#fcd34d",
    "#6ee7b7",
    "#93c5fd",
    "#f0abfc",
    "#f9a8d4",
  ];
  const isCustomSelected = !presetColors.includes(newTask.color);
  const colorOfCustomBtn = isCustomSelected ? customColor : "#694cf1";

  const handleClick = () => {
    setTimeout(() => {
      colorRef.current?.click();
    }, 0);
  };

  const iconColor = isLight(colorOfCustomBtn) ? "primary" : "white";

  return (
    <div className="flex-center border-light-border dark:border-dark-border bg-blur h-10 flex-none justify-between gap-2 rounded-full border px-4">
      <ColorButton
        value="#ffffff"
        classList={preferences.theme === "dark" ? "bg-black/50" : "bg-white/50"}
        isChecked={newTask.color === "#ffffff"}
      />
      <ColorButton
        value="#fca5a5"
        classList="bg-red-300/50"
        isChecked={newTask.color === "#fca5a5"}
      />
      <ColorButton
        value="#fdba74"
        classList="bg-orange-300/50"
        isChecked={newTask.color === "#fdba74"}
      />
      <ColorButton
        value="#fcd34d"
        classList="bg-amber-300/50"
        isChecked={newTask.color === "#fcd34d"}
      />
      <ColorButton
        value="#6ee7b7"
        classList="bg-emerald-300/50"
        isChecked={newTask.color === "#6ee7b7"}
      />
      <ColorButton
        value="#93c5fd"
        classList="bg-blue-300/50"
        isChecked={newTask.color === "#93c5fd"}
      />
      <ColorButton
        value="#f0abfc"
        classList="bg-fuchsia-300/50"
        isChecked={newTask.color === "#f0abfc"}
      />
      <ColorButton
        value="#f9a8d4"
        classList="bg-pink-300/50"
        isChecked={newTask.color === "#f9a8d4"}
      />

      <label className="focus-within:ring-primary rounded-full focus-within:ring-2">
        <input
          type="radio"
          name="color"
          className="peer sr-only"
          checked={isCustomSelected}
          readOnly
          onClick={handleClick}
        />
        <input
          ref={colorRef}
          name="color"
          type="color"
          className="peer sr-only"
          value={colorOfCustomBtn}
          tabIndex="-1"
          onChange={(e) => {
            setCustomColor(e.target.value);
            dispatch({ type: "updateNewTaskColor", payload: e.target.value });
          }}
        />

        <span
          className="color-dot flex items-center justify-center text-white focus:outline-none"
          style={{ background: colorOfCustomBtn }}
          tabIndex="-1"
        >
          <Icon name="plus" size="14" color={iconColor} />
        </span>
      </label>
    </div>
  );
}
