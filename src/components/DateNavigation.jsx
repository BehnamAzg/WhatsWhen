import Button from "./Button";
import Icon from "./Icon";


export default function DateNavigation({ dispatch, dateInfo }) {
  return (
    <div className={`date-navigation-capsule-container ${dateInfo === "Today" ? "bg-primary text-white text-base" : "bg-white/50 text-black text-sm"}`}>
      <Button type="navigateLeft" dispatch={dispatch} actionType="goToPrevDay">
        <Icon name="caret-left" color={dateInfo === "Today" ? "White" : "black"} />
      </Button>

      <span>{dateInfo}</span>

      <Button type="navigateRight" dispatch={dispatch} actionType="goToNextDay">
        <Icon name="caret-right" color={dateInfo === "Today" ? "White" : "black"} />
      </Button>
    </div>
  );
}
