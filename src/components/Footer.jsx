import useStateContext from "../context/useStateContext";
import Button from "./Button";
import Icon from "./Icon";

export default function Footer() {
  const { currentTask, activeCard, sortedCards } = useStateContext();

  return (
    <footer className="footer-container">
      {sortedCards[activeCard]?.id !== currentTask?.id ? (
        <Button type="capsule" actionType="goToCurrentTask">
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
