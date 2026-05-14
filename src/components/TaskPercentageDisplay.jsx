import Button from "./Button";

export default function TaskPercentageDisplay({ taskPercent }) {
  return (
    <div className="popover-wrapper">
      <Button type="popover" popoverTarget="taskPercentagePopover">
        <span className="text-xl">{taskPercent}</span>
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
