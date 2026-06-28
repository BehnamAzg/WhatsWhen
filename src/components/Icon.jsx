const colors = {
  none: "",
  white: "text-white dark:text-dark-theme-text",
  black: "text-black dark:text-dark-theme-text",
  primary: "text-primary",
  gray: "text-neutral-500 dark:text-dark-theme-text/50",
  fade: "text-white/70 dark:text-white/35",
};

export default function Icon({ name, size = "16", color = "black" }) {
  return (
    <svg
      width={size}
      height={size}
      fill="currentColor"
      className={`${colors[color]}`}
    >
      <use href={`./icons.svg#icon-${name}`}></use>
    </svg>
  );
}
