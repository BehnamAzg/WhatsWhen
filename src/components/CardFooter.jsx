import { useEffect, useMemo, useState } from "react";
import useStateContext from "../context/useStateContext";
import { calculateRemainingSeconds, formatCountdownTime } from "../utils/time";
import { getTargetDate } from "../utils/date";

import Icon from "./Icon";
import Button from "./Button";

export default function CardFooter({ index }) {
  const { currentTaskIndex, isCurrentTaskToday, durations } = useStateContext();

  const [now, setNow] = useState(() => Date.now());

  const targetTime = isCurrentTaskToday
    ? durations[currentTaskIndex]?.nextTaskTime
    : null;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const targetDate = useMemo(() => {
    if (!isCurrentTaskToday || !targetTime) return null;
    return getTargetDate(targetTime);
  }, [targetTime, isCurrentTaskToday]);

  const countdownSeconds = useMemo(() => {
    return calculateRemainingSeconds(targetDate);
  }, [targetDate, now]);

  const formattedCountdown = formatCountdownTime(countdownSeconds);

  return (
    <div className="flex w-full justify-between pb-[8.2vh] select-none">
      <time
        className={`current-task-timer ${isCurrentTaskToday && "current-task-timer-active"}`}
      >
        {isCurrentTaskToday ? formattedCountdown : durations[index].formatted}
      </time>
      <div className="flex-center gap-2">
        <Button type="circleSm">
          <Icon name="trash" />
        </Button>
        <Button type="circleSm">
          <Icon name="pencil" />
        </Button>
      </div>
    </div>
  );
}
