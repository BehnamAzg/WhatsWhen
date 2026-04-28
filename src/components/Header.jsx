import { useEffect, useState } from "react";

import Button from "./Button";
import Icon from "./Icon";
import DateDisplay from "./DateDisplay";
import TaskCountDisplay from "./TaskCountDisplay";
import TaskPercentageDisplay from "./TaskPercentageDisplay";
import DateNavigation from "./DateNavigation";
import { useStateContext } from "./StateProvider";

function dateInfoDisplay(date, curDate) {
  const createUtcDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  };

  const date1 = createUtcDate(curDate);
  const date2 = createUtcDate(date);

  const diffInMilliseconds = date2.getTime() - date1.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) {
    return "Today"
  } else if (diffInDays === 1) {
    return "Tomorrow"
  } else if (diffInDays === -1) {
    return "Yesterday"
  } else if (diffInDays > 0) {
    return `In ${diffInDays} days`
  } else if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} days ago`
  }
}

export default function Header() {
  const { currentDate, viewDate } = useStateContext();
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  useEffect(function () {
    function getDate(dateString) {
      const now = new Date(dateString);
      const day = now.toLocaleDateString("en-US", { weekday: "short" });
      const date = String(now.getDate()).padStart(2, "0");
      const month = now.toLocaleDateString("en-US", { month: "short" });
      setDay(day);
      setDate(date);
      setMonth(month);
    }
    getDate(viewDate);
  }, [viewDate]);

  return (
    <header>
      <div className="header-row-container">
        <Button type="circle" actionType="toggleMenu">
          <Icon name="list" size="20" />
        </Button>
        <DateDisplay day={day} date={date} month={month} />
        <Button type="circle" actionType="toggleCalendar">
          <Icon name="calendar" size="20" />
        </Button>
      </div>
      <div className="header-row-container">
        <TaskCountDisplay />
        <DateNavigation dateInfo={dateInfoDisplay(viewDate, currentDate)} />
        <TaskPercentageDisplay taskPercent="??" />
      </div>
    </header>
  );
}
