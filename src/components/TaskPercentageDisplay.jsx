import useStateContext from "../context/useStateContext";

import Button from "./Button";

function calculatePercentage(numerator, denominator) {
  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 100);
}

export default function TaskPercentageDisplay() {
  const { cardsCount, currentTaskIndex } = useStateContext();

  return (
    <div className="popover-wrapper">
      <Button type="popover" popoverTarget="taskPercentagePopover" onClick={() => ""}>
        <span className="space-x-0.5">
          <span className="text-xl dark:text-dark-theme-text">
            {calculatePercentage(currentTaskIndex + 1, cardsCount)}
          </span>
          <span className="text-primary pt-1 text-xs">%</span>
        </span>
      </Button>

      <dialog
        id="taskPercentagePopover"
        popover="hint"
        role="tooltip"
        className="popover-body popover-task-percentage"
      >
        Percentage of Completed Tasks
      </dialog>
    </div>
  );
}
