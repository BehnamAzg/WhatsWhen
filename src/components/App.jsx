import { useReducer, useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Menu from "./Menu";
import Calendar from "./Calendar";
import CreateTask from "./CreateTask";
import Shortcuts from "./Shortcuts";

// const id = crypto.randomUUID();

const dates = {
  "2026-04-26": [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      time: "06:00",
      title: "This is a long title for testing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: "🌞",
      color: "",
      tag: "Morning Routine",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: true },
        { text: "This is todo 2", done: false },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: false,
    },
    {
      id: "550e8400-e29b-41d4-a716-546655440000",
      time: "06:30",
      title: "This is a long title for testing",
      icon: "☕",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "bg-amber-300/40",
      tag: "Morning Routine",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: false },
        { text: "This is todo 2", done: true },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: false,
    },
  ],
};

const initialState = {
  isMenuPanelOpen: false,
  isCalendarPanelOpen: false,
  isCreateTaskPanelOpen: false,
  isShortcutsPanelOpen: false,
  currentDate: formatDate(new Date()),
  viewDate: formatDate(new Date()),
  // isEmojiPanelOpen: false,
  // isPomodoroTimerSelected: false,
  // isAddTodoSelected: false,
  // goToCurrentTask
  // installApp
  // isShortcutsPanelOpen
  // toggleTheme
  // createNewTask
  // toggleNotification
  newTask: {
    id: "",
    time: "",
    title: "",
    icon: "",
    description: "",
    color: "",
    tag: "",
    reminder: false,
    repeat: [],
    todos: [],
    pomodoroTimer: false,
  },
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function shiftDate(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function reducer(state, action) {
  switch (action.type) {
    case "toggleMenu":
      return {
        ...state,
        isMenuPanelOpen: !state.isMenuPanelOpen,
        isCalendarPanelOpen: false,
        isCreateTaskPanelOpen: false,
        isShortcutsPanelOpen: false,
      };
    case "toggleCalendar":
      return {
        ...state,
        isCalendarPanelOpen: !state.isCalendarPanelOpen,
        isMenuPanelOpen: false,
        isCreateTaskPanelOpen: false,
        isShortcutsPanelOpen: false,
      };
    case "toggleCreateTask":
      return {
        ...state,
        isCreateTaskPanelOpen: !state.isCreateTaskPanelOpen,
        isMenuPanelOpen: false,
        isCalendarPanelOpen: false,
        isShortcutsPanelOpen: false,
      };
    case "toggleShortcuts":
      return {
        ...state,
        isShortcutsPanelOpen: !state.isShortcutsPanelOpen,
        isCalendarPanelOpen: false,
        isCreateTaskPanelOpen: false,
        isMenuPanelOpen: false,
      };
    case "closeAllPanels":
      return {
        ...state,
        isMenuPanelOpen: false,
        isCalendarPanelOpen: false,
        isCreateTaskPanelOpen: false,
        isShortcutsPanelOpen: false,
      };
    case "goToNextDay":
      return {
        ...state,
        viewDate: shiftDate(state.viewDate, 1),
      };
    case "goToPrevDay":
      return {
        ...state,
        viewDate: shiftDate(state.viewDate, -1),
      };
    case "setViewDate":
      return {
        ...state,
        viewDate: action.payload ? action.payload : state.viewDate,
        // isCalendarPanelOpen: false,
      };
    // case "addNewTask":
    //   return {

    //   }
    default:
      console.log("Unknown action!");
  }
}

export default function App() {
  const [{ isMenuPanelOpen, isCalendarPanelOpen, isCreateTaskPanelOpen, isShortcutsPanelOpen, currentDate, viewDate, newTask }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isInputOrTextarea = event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA" || event.target.isContentEditable;

      if (!isInputOrTextarea) {
        if (event.key === "n") {
          event.preventDefault();
          dispatch({ type: "toggleCreateTask" });
        }

        if (event.key === "m") {
          event.preventDefault();
          dispatch({ type: "toggleMenu" });
        }

        if (event.key === "c") {
          event.preventDefault();
          dispatch({ type: "toggleCalendar" });
        }

        if (event.key === "/") {
          event.preventDefault();
          dispatch({ type: "toggleShortcuts" });
        }

        if (event.key === "Escape") {
          event.preventDefault();
          dispatch({ type: "closeAllPanels" });
        }

        if (event.key === "d" || event.key === "ArrowRight") {
          event.preventDefault();
          dispatch({ type: "goToNextDay" });
        }

        if (event.key === "a" || event.key === "ArrowLeft") {
          event.preventDefault();
          dispatch({ type: "goToPrevDay" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="app-outter-container">
      <div className="app-inner-container">
        <Header dispatch={dispatch} currentDate={currentDate} viewDate={viewDate} cardsCount={dates[viewDate]?.length || 0} />
        <Main dispatch={dispatch} cards={dates[viewDate]} />
        <Footer dispatch={dispatch} />
        {isCalendarPanelOpen && <Calendar dispatch={dispatch} isCalendarPanelOpen={isCalendarPanelOpen} />}
        {isMenuPanelOpen && <Menu dispatch={dispatch} isMenuPanelOpen={isMenuPanelOpen} />}
        {isCreateTaskPanelOpen && <CreateTask dispatch={dispatch} isCreateTaskPanelOpen={isCreateTaskPanelOpen} />}
        {isShortcutsPanelOpen && <Shortcuts dispatch={dispatch} isShortcutsPanelOpen={isShortcutsPanelOpen} />}
      </div>
    </div>
  );
}
