import useStateContext from "../context/useStateContext";
import Button from "./Button";
import Icon from "./Icon";

export default function Footer() {
  const { currentTask, activeCard, sortedCards, currentDate, viewDate } = useStateContext();

  const showCurrentTaskButton = () => {
    if (currentDate === viewDate && sortedCards[activeCard]?.id === currentTask?.id) return false;
    if (currentDate === viewDate) return true;
    if (currentDate !== viewDate) return true;
    return false;
  }

  return (
    <footer className="footer-container">
      {showCurrentTaskButton() ? (
        <Button type="capsuleCurrent" actionType="jumpToCurrentTask">
          <span>Current Task</span>
          <Icon name="caret-right" size="12" />
        </Button>
      ) : (
        <div></div>
      )}

      <Button type="createTask" actionType="toggleCreateTask">
        <Icon name="plus" size="20" color="white" />
      </Button>
    </footer>
  );
}
