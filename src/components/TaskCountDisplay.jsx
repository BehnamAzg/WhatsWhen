import Button from "./Button";

export default function TaskCountDisplay({ completedTasks, totalTasks }) {
  return (
    <div className="popover-wrapper">
      <Button type="popover" popoverTarget="taskCountPopover">
        <span className="text-xl">{completedTasks}</span>
        <span className="text-xs text-primary pt-1">/{totalTasks}</span>
      </Button>

      <dialog id="taskCountPopover" popover="hint" role="tooltip" className="popover-body popover-task-count">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </dialog>
    </div>
  );
}
