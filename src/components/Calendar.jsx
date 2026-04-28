import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useStateContext } from "./StateProvider";

import Button from "./Button";
import Icon from "./Icon";

const formatDate = (date) => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function Calendar() {
  const { dispatch, isCalendarPanelOpen } = useStateContext();

  const [selected, setSelected] = useState(new Date());
  const componentRef = useRef(null);

  useEffect(() => {
    dispatch({ type: "setViewDate", payload: formatDate(selected) });
    dispatch({ type: "toggleCalendar" });
  }, [selected, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCalendarPanelOpen && componentRef.current && !componentRef.current.contains(event.target)) {
        dispatch({ type: "toggleCalendar" });
      }
    };

    if (isCalendarPanelOpen) {
      const focusableElements = componentRef.current.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        // Fallback
        componentRef.current.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarPanelOpen, dispatch]);

  return (
    <div ref={componentRef} className="modal-container enter-transition">
      <h1 className="header-title">
        <Button type="close" dispatch={dispatch} actionType="toggleCalendar">
          <Icon name="x" color="white" />
        </Button>
        <span className="text-base">Calendar</span>
      </h1>

      <div className="px-4 flex-center my-2">
        <DayPicker mode="single" selected={selected} onSelect={setSelected} />
      </div>
    </div>
  );
}
