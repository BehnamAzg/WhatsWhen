import useStateContext from "../context/useStateContext";

import Button from "./Button";

function calculatePercentage(numerator, denominator) {
  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 100)
}

export default function TaskPercentageDisplay() {
  const { cardsCount, currentTaskIndex } = useStateContext();

  return (
    <div className="popover-wrapper">
      <Button type="popover" popoverTarget="taskPercentagePopover">
        <span className="text-xl">
          {calculatePercentage(currentTaskIndex + 1, cardsCount)}
        </span>
        <span className="text-primary pt-1 text-xs">%</span>
      </Button>

      <dialog
        id="taskPercentagePopover"
        popover="hint"
        role="tooltip"
        className="popover-body popover-task-percentage"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit 2.
      </dialog>
    </div>
  );
}
