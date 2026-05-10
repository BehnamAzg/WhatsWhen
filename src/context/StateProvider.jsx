import { useEffect, useReducer } from "react";
import { formatDate, shiftDate } from "../utils/date";
import StateContext from './StateContext';

const dates = {
  "2026-05-10": [
    {
      id: "550e8400-e29b-41d4-a716-146655440000",
      time: "06:00",
      title: "This is a long title for testing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: "🌞",
      color: "#FDE68A66",
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
      id: "550e8400-e29b-41d4-a716-246655440000",
      time: "06:30",
      title: "This is a long title for testing",
      icon: "☕",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#FDE68A66",
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
    {
      id: "550e8400-e29b-41d4-a716-346655440000",
      time: "07:30",
      title: "This is a long title for testing",
      icon: "🏃‍♂️",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#FDE68A66",
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
  isEmojiPanelOpen: false,
  // isPomodoroTimerSelected: false,
  // isAddTodoSelected: false,
  // goToCurrentTask
  // toggleTheme
  // installApp
  // createNewTask
  // toggleNotification
  newTask: {
    id: crypto.randomUUID(),
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

export default function StateProvider({ children }) {
  const [{ isMenuPanelOpen, isCalendarPanelOpen, isCreateTaskPanelOpen, isShortcutsPanelOpen, currentDate, viewDate }, dispatch] = useReducer(reducer, initialState);

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
    <StateContext.Provider
      value={{
        dispatch,
        currentDate,
        viewDate,
        cardsCount: dates[viewDate]?.length || 0,
        cards: dates[viewDate],
        isMenuPanelOpen,
        isCreateTaskPanelOpen,
        isCalendarPanelOpen,
        isShortcutsPanelOpen,
      }}>
      {children}
    </StateContext.Provider>
  );
}
