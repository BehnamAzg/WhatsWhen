import ColorButton from "./ColorButton";
import Icon from "./Icon";

export default function ColorSelection() {
  return (
    <div className="flex-center h-10 flex-none justify-between gap-2 rounded-full border border-white bg-white/50 px-4">
      <ColorButton value="#fca5a5" classList="bg-white/50" isChecked={true} />
      <ColorButton value="#fca5a5" classList="bg-red-300/50" />
      <ColorButton value="#fdba74" classList="bg-orange-300/50" />
      <ColorButton value="#fcd34d" classList="bg-amber-300/50" />
      <ColorButton value="#6ee7b7" classList="bg-emerald-300/50" />
      <ColorButton value="#93c5fd" classList="bg-blue-300/50" />
      <ColorButton value="#f0abfc" classList="bg-fuchsia-300/50" />
      {/* <ColorButton value="#f9a8d4" classList="bg-pink-300/50" /> */}

      <label className="focus-within:ring-primary rounded-full focus-within:ring-2">
        <input
          name="customColor"
          type="color"
          className="peer sr-only"
          defaultValue="#694cf1"
        />
        <span
          className="color-dot bg-primary flex items-center justify-center text-white focus:outline-none"
          tabIndex="-1"
        >
          <Icon name="plus" size="14" color="white" />
        </span>
      </label>
    </div>
  );
}
