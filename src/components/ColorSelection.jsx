import ColorButton from "./ColorButton";
import Icon from "./Icon";

export default function ColorSelection() {
  return (
    <div className="flex-center h-10 flex-none justify-between gap-2 rounded-full border border-white bg-white/50 px-4">
      <ColorButton value="bg-red-300/40" classList="bg-red-300/50" />
      <ColorButton value="bg-orange-300/40" classList="bg-orange-300/50" />
      <ColorButton
        value="bg-amber-300/40"
        classList="bg-amber-300/50"
        isChecked={true}
      />
      <ColorButton value="bg-emerald-300/40" classList="bg-emerald-300/50" />
      <ColorButton value="bg-blue-300/40" classList="bg-blue-300/50" />
      <ColorButton value="bg-fuchsia-300/40" classList="bg-fuchsia-300/50" />
      <ColorButton value="bg-pink-300/40" classList="bg-pink-300/50" />

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
