import Button from "./Button";
import Icon from "./Icon";

export default function Footer({ dispatch }) {
  return (
    <footer className="footer-container">
      <Button type="capsule">
        <span>Current Task</span>
        <Icon name="caret-right" size="12" />
      </Button>
      <Button type="createTask" dispatch={dispatch} actionType="toggleCreateTask">
        <Icon name="plus" size="20" color="white" />
      </Button>
    </footer>
  );
}
