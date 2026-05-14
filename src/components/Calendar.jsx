import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";

import useStateContext from "../context/useStateContext";
import { formatDate } from "../utils/date";

import Button from "./Button";
import Icon from "./Icon";

import "react-day-picker/style.css";

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
      if (
        isCalendarPanelOpen &&
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        dispatch({ type: "toggleCalendar" });
      }
    };

    // Focusing on the first element after opening a panel (for tabindex accessibility)
    if (isCalendarPanelOpen) {
      const focusableElements = componentRef.current.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
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

      <div className="flex-center my-2 px-4">
        <DayPicker mode="single" selected={selected} onSelect={setSelected} />
      </div>
    </div>
  );
}
