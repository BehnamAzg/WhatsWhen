import Icon from "./Icon";
import Button from "./Button";

export default function NoTasks() {
  return (
    <div className="flex-center h-full w-full">
      <div className="flex-center w-fit flex-col gap-3 rounded-2xl px-4 py-6">
        <span className="enter-transition text- dark:text-dark-theme-text text-sm">
          No Tasks
        </span>
        <Button type="capsuleAddTask" width="fit" actionType="toggleCreateTask">
          <Icon name="plus" color="white" size="14" />
          <span>Create a New Task</span>
        </Button>
      </div>
    </div>
  );
}
