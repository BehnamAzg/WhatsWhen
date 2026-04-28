import { useStateContext } from "./StateProvider";

const types = {
  default: "",
  circle: "btn-circle",
  capsule: "btn-capsule",
  popover: "btn-popover",
  navigateRight: "btn-navigate-right",
  navigateLeft: "btn-navigate-left",
  createTask: "btn-create-task",
  close: "btn-close",
  theme: "btn-theme",
  themeSelected: "btn-theme-selected",
  install: "btn-install",
};

const widths = {
  default: "",
  full: "w-full",
  fit: "w-fit",
};

export default function Button({ children, type = "default", popoverTarget = "", actionType, width = "default" }) {
  const { dispatch } = useStateContext();

  return (
    <button type="button" className={`btn ${types[type]} ${widths[width]}`} onClick={type === "popover" ? () => "" : () => dispatch({ type: `${actionType}` })} popoverTarget={popoverTarget}>
      {children}
    </button>
  );
}
