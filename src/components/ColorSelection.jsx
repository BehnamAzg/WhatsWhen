import { useRef, useState } from "react";
import useStateContext from "../context/useStateContext";
import { isLight } from "../utils/color";
import ColorButton from "./ColorButton";
import Icon from "./Icon";

export default function ColorSelection() {

  const [customColor, setCustomColor] = useState("#694cf1");
  const colorRef = useRef(null);
  const { dispatch } = useStateContext();

  const handleClick = () => {
    setTimeout(() => {
      colorRef.current?.click();
    }, 0);
  };

  const iconColor = isLight(customColor) ? "primary" : "white";

  return (
    <div className="flex-center h-10 flex-none justify-between gap-2 rounded-full border border-white bg-white/50 px-4">
      <ColorButton value="#ffffff" classList="bg-white/50" isChecked={true} />
      <ColorButton value="#fca5a5" classList="bg-red-300/50" />
      <ColorButton value="#fdba74" classList="bg-orange-300/50" />
      <ColorButton value="#fcd34d" classList="bg-amber-300/50" />
      <ColorButton value="#6ee7b7" classList="bg-emerald-300/50" />
      <ColorButton value="#93c5fd" classList="bg-blue-300/50" />
      <ColorButton value="#f0abfc" classList="bg-fuchsia-300/50" />
      <ColorButton value="#f9a8d4" classList="bg-pink-300/50" />

      <label className="focus-within:ring-primary rounded-full focus-within:ring-2">
        <input
          type="radio"
          name="color"
          className="peer sr-only"
          onClick={handleClick}
        />
        <input
          ref={colorRef}
          name="color"
          type="color"
          className="peer sr-only"
          value={customColor}
          tabIndex="-1"
          onChange={(e) => {
            dispatch({ type: "updateNewTaskColor", payload: e.target.value });
            setCustomColor(e.target.value);
          }}
        />

        <span
          className="color-dot flex items-center justify-center text-white focus:outline-none"
          style={{ background: customColor }}
          tabIndex="-1"
          
        >
          <Icon name="plus" size="14" color={iconColor} />
        </span>
      </label>
    </div>
  );
}
