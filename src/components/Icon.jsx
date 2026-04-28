const colors = {
  none: "",
  white: "text-white",
  black: "text-black",
  primary: "text-primary",
  gray: "text-neutral-500",
};

export default function Icon({ name, size = "16", color = "black" }) {
  return (
    <svg width={size} height={size} fill="currentColor" className={`${colors[color]}`}>
      <use href={`/icons.svg#icon-${name}`}></use>
    </svg>
  );
}
