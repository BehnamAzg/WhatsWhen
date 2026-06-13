import Button from "./Button";
import Icon from "./Icon";

export default function DateNavigation({ dateInfo }) {
  return (
    <div
      className={`date-navigation-capsule-container ${dateInfo === "Today" ? "bg-primary text-base text-white dark:text-dark-theme-text" : "bg-background dark:bg-primary/15 text-sm text-black dark:text-dark-theme-text"}`}
    >
      <Button type="navigateLeft" actionType="goToPrevDay">
        <Icon
          name="caret-left"
          color={dateInfo === "Today" ? "White" : "black"}
        />
      </Button>

      <span>{dateInfo}</span>

      <Button type="navigateRight" actionType="goToNextDay">
        <Icon
          name="caret-right"
          color={dateInfo === "Today" ? "White" : "black"}
        />
      </Button>
    </div>
  );
}
