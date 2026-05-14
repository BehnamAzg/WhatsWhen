import useStateContext from "../context/useStateContext";

import Button from "./Button";

export default function TaskCountDisplay() {
  const { cardsCount } = useStateContext();

  return (
    <div className="popover-wrapper">
      <Button type="popover" popoverTarget="taskCountPopover">
        <span className="text-xl">?</span>
        <span className="text-primary pt-1 text-xs">/{cardsCount}</span>
      </Button>

      <dialog
        id="taskCountPopover"
        popover="hint"
        role="tooltip"
        className="popover-body popover-task-count"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </dialog>
    </div>
  );
}
