import useStateContext from "../context/useStateContext";

const types = {
  default: "",
  circle: "btn-circle",
  circleSm: "btn-circle-sm",
  circleXs: "btn-circle-xs",
  capsule: "btn-capsule",
  popover: "btn-popover",
  navigateRight: "btn-navigate-right",
  navigateLeft: "btn-navigate-left",
  createTask: "btn-create-task",
  close: "btn-close",
  theme: "btn-theme",
  themeSelected: "btn-theme-selected",
  install: "btn-install",
  cancel: "btn-capsule-cancel",
  add: "btn-capsule-add",
};

const widths = {
  default: "",
  full: "w-full",
  fit: "w-fit",
};

export default function Button({
  children,
  type = "default",
  popoverTarget = "",
  actionType = "",
  actionPayload = "",
  width = "default",
  link = "",
}) {
  const { dispatch } = useStateContext();

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${types[type]} ${widths[width]}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`btn ${types[type]} ${widths[width]}`}
      onClick={
        type === "popover"
          ? () => ""
          : () => dispatch({ type: actionType, payload: actionPayload })
      }
      popoverTarget={popoverTarget}
    >
      {children}
    </button>
  );
}
