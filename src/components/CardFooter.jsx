import { useEffect, useState } from "react";
import useStateContext from "../context/useStateContext";

import Icon from "./Icon";
import Button from "./Button";

export default function CardFooter({ card }) {
  const {
    activeCard,
    currentTaskIndex,
    sortedCards,
    currentTask,
    viewDate,
    currentDate,
  } = useStateContext();

  /*
  const [timeLeft, setTimeLeft] = useState(null);
  const [isCurrentTaskActive, setIsCurrentTaskActive] = useState(false);

  useEffect(() => {
    if (activeCard === currentTaskIndex) {
      setIsCurrentTaskActive(true);
      const nextTask = getNextTask(tasksForToday, task.id); // Implement this helper
      const initialDuration = calculateDuration(
        task.time,
        nextTask?.time,
        currentTime,
      );
      setTimeLeft(initialDuration);
    } else {
      setIsCurrentTaskActive(false);
      setTimeLeft(null); // Reset if not active
    }
  }, [activeCard, currentTaskIndex]);

  useEffect(() => {
      let countdownInterval;
      if (isCurrentTaskActive && timeLeft !== null && timeLeft > 0) {
        countdownInterval = setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1); // Decrement by 1 second
        }, 1000);
      } else if (timeLeft === 0) {
        // Optional: Handle when countdown finishes, e.g., trigger parent to re-evaluate active task
        // Or just let the main currentTime interval handle it.
      }

      // Cleanup interval
      return () => {
        if (countdownInterval) clearInterval(countdownInterval);
      };
    }, [isCurrentTaskActive, timeLeft]); // Depend on state that controls the interval
    */

  return (
    <div className="flex w-full justify-between pb-[8.2vh] select-none">
      <time className="rounded-full bg-white/40 px-3 py-1.5 text-sm font-bold tracking-wider">
        01:30:59
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
