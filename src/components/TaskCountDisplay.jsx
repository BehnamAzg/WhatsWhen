import Button from "./Button";
import { useStateContext } from "./StateProvider";

export default function TaskCountDisplay() {
  const { cardsCount } = useStateContext();

  return (
    <div className="popover-wrapper">
      <Button type="popover" popoverTarget="taskCountPopover">
        <span className="text-xl">?</span>
        <span className="text-xs text-primary pt-1">/{cardsCount}</span>
      </Button>

      <dialog id="taskCountPopover" popover="hint" role="tooltip" className="popover-body popover-task-count">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </dialog>
    </div>
  );
}
