import { useCallback, useEffect, useReducer, useRef } from "react";
import { formatDate, shiftDate, isDateFuture } from "../utils/date";
import { timeToSeconds } from "../utils/time";
import StateContext from "./StateContext";

const dates = {
  "2026-05-15": [
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
      tag: "",
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
  "2026-05-16": [
    {
      id: "550e8400-e29b-41d4-a716-146655440000",
      time: "11:00",
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
      time: "11:30",
      title: "This is a long title for testing",
      icon: "☕",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#FDE68A66",
      tag: "",
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
      time: "15:39",
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
  "2026-05-17": [
    {
      id: "550e8400-e29b-41d4-a716-146655440000",
      time: "14:27",
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
      time: "14:30",
      title: "This is a long title for testing",
      icon: "☕",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#FDE68A66",
      tag: "",
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
      time: "15:30",
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
  isEmojiPanelOpen: false,
  currentTime: new Date(),
  currentDate: formatDate(new Date()),
  viewDate: formatDate(new Date()),
  sortedCards: [],
  currentTask: "",
  activeCard: 0,
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
    case "goToPrevCard":
      if (state.activeCard > 0)
        return {
          ...state,
          activeCard: state.activeCard - 1,
        };
      return {
        ...state,
        activeCard: 0,
      };
    case "goToNextCard":
      if (state.activeCard < state.sortedCards.length - 1)
        return {
          ...state,
          activeCard: state.activeCard + 1,
        };
      return {
        ...state,
        activeCard: state.sortedCards.length - 1,
      };
    case "updateTime":
      return {
        ...state,
        currentTime: new Date(),
      };
    case "updateSortedCards":
      return {
        ...state,
        sortedCards: [...(dates[state.viewDate] || [])].sort(
          (a, b) => timeToSeconds(a.time) - timeToSeconds(b.time),
        ),
      };
    case "updateCurrentTask":
      return {
        ...state,
        currentTask: state.sortedCards.reduce((latestTask, task) => {
          const taskDateTime = new Date(`${state.viewDate}T${task.time}:00`);
          if (taskDateTime <= state.currentTime) {
            return task;
          }
          return latestTask;
        }, null),
      };
    case "goToCurrentTask": {
      const index = state.sortedCards.findIndex(
        (obj) => obj.id === state.currentTask?.id,
      );

      if (state.viewDate === state.currentDate)
        return {
          ...state,
          activeCard: index,
        };
      if (isDateFuture(state.currentDate, state.viewDate))
        return {
          ...state,
          activeCard: 0,
        };

      return {
        ...state,
        activeCard: state.sortedCards.length - 1,
      };
    }
    case "goToFirstTask": {
      return {
        ...state,
        activeCard: 0,
      };
    }
    case "goToLastTask": {
      return {
        ...state,
        activeCard: state.sortedCards.length - 1,
      };
    }
    case "goToCurrentDay": {
      return {
        ...state,
        viewDate: state.currentDate,
      };
    }
    // case "addNewTask":
    //   return {

    //   }
    default:
      console.log("Unknown action!");
  }
}

export default function StateProvider({ children }) {
  const [
    {
      isMenuPanelOpen,
      isCalendarPanelOpen,
      isCreateTaskPanelOpen,
      isShortcutsPanelOpen,
      currentDate,
      viewDate,
      activeCard,
      sortedCards,
      currentTask,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Updating the current task ##################################################
  useEffect(() => {
    dispatch({ type: "updateSortedCards" });
    dispatch({ type: "updateCurrentTask" });

    if (viewDate === currentDate) {
      return dispatch({ type: "goToCurrentTask" });
    } else if (isDateFuture(currentDate, viewDate)) {
      return dispatch({ type: "goToFirstTask" });
    } else {
      return dispatch({ type: "goToLastTask" });
    }
  }, [viewDate, currentDate]);

  // Timer for updating the current task ########################################
  const scheduleNextUpdateRef = useRef(null);
  const timerRef = useRef(null);

  const updateAndSchedule = useCallback(() => {
    dispatch({ type: "updateTime" });
    dispatch({ type: "updateCurrentTask" });
    dispatch({ type: "goToCurrentTask" });

    if (scheduleNextUpdateRef.current) {
      scheduleNextUpdateRef.current();
    }
  }, []);

  useEffect(() => {
    const setupTimer = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();

      const delay = (60 - seconds) * 1000 - milliseconds;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(updateAndSchedule, delay);
    };

    scheduleNextUpdateRef.current = setupTimer;
    setupTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      scheduleNextUpdateRef.current = null;
    };
  }, [updateAndSchedule]);

  // Mouse scroll handler ######################################################
  useEffect(() => {
    function handleScroll(e) {
      if (e.deltaY > 50 && activeCard < sortedCards.length - 1) {
        dispatch({ type: "goToNextCard" });
      } else if (e.deltaY < 50) {
        dispatch({ type: "goToPrevCard" });
      }
    }

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [activeCard, sortedCards]);

  // Shortcuts key handler ######################################################
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isInputOrTextarea =
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.isContentEditable;

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

        if (event.key === "t") {
          event.preventDefault();
          dispatch({ type: "goToCurrentTask" });
        }

        if (event.key === "r") {
          event.preventDefault();
          dispatch({ type: "goToCurrentDay" });
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

        if (event.key === "w" || event.key === "ArrowUp") {
          event.preventDefault();
          dispatch({ type: "goToPrevCard" });
        }

        if (event.key === "s" || event.key === "ArrowDown") {
          event.preventDefault();
          dispatch({ type: "goToNextCard" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Return body of the provider ################################################
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
        activeCard,
        sortedCards,
        currentTask,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
