import useStateContext from "../context/useStateContext";

import Button from "./Button";

export default function TaskCountDisplay() {
  const { cardsCount, currentTaskIndex } = useStateContext();

  return (
    <div className="popover-wrapper">
      <Button
        type="popover"
        popoverTarget="taskCountPopover"
        onClick={() => ""}
      >
        <span className="space-x-0.5">
          <span className="dark:text-dark-theme-text space-x-3 text-xl">
            {currentTaskIndex + 1}
          </span>
          <span className="text-primary pt-1 text-xs">/</span>
          <span className="text-primary pt-1 text-xs">{cardsCount}</span>
        </span>
      </Button>

      <dialog
        id="taskCountPopover"
        popover="hint"
        role="tooltip"
        className="popover-body popover-task-count"
      >
        Count of Completed Tasks
      </dialog>
    </div>
  );
}
