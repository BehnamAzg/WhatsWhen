import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { formatDate, shiftDate, isDateFuture } from "../utils/date";
import { formatTime, timeToSeconds, getTimeDifference } from "../utils/time";
import StateContext from "./StateContext";

const dates = {
  "2026-06-13": [
    {
      id: "550e8400-e29b-41d4-a716-146655440000",
      time: "13:00",
      title: "This is a long title for testing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: "",
      color: "#6ee7b766",
      tag: "Morning Routine",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: true },
        { text: "This is todo 2", done: false },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
    {
      id: "550e8400-e29b-41d4-a716-246655440000",
      time: "11:30",
      title: "This is a long title for testing",
      icon: "☕",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#93c5fd66",
      tag: "",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: false },
        { text: "This is todo 2", done: true },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
    {
      id: "550e8400-e29b-41d4-a716-346655440000",
      time: "16:15",
      title: "This is a long title for testing",
      icon: "🏃‍♂️",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#ffffff66",
      tag: "Morning Routine",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: false },
        { text: "This is todo 2", done: true },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
  ],
  "2026-06-14": [
    {
      id: "550e8400-e29b-41d4-a716-146655440000",
      time: "08:00",
      title: "This is a long title for testing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: "",
      color: "#6ee7b766",
      tag: "Morning Routine",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: true },
        { text: "This is todo 2", done: false },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
    {
      id: "550e8400-e29b-41d4-a716-246655440000",
      time: "11:48",
      title: "This is a long title for testing",
      icon: "☕",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#93c5fd66",
      tag: "",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: false },
        { text: "This is todo 2", done: true },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
    {
      id: "550e8400-e29b-41d4-a716-346655440000",
      time: "16:15",
      title: "This is a long title for testing",
      icon: "🏃‍♂️",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#ffffff66",
      tag: "Morning Routine",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: false },
        { text: "This is todo 2", done: true },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
  ],
  "2026-06-15": [
    {
      id: "550e8400-e29b-41d4-a716-146655440000",
      time: "13:00",
      title: "This is a long title for testing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: "",
      color: "#6ee7b766",
      tag: "Morning Routine",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: true },
        { text: "This is todo 2", done: false },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
    {
      id: "550e8400-e29b-41d4-a716-246655440000",
      time: "14:30",
      title: "This is a long title for testing",
      icon: "☕",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#93c5fd66",
      tag: "",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: false },
        { text: "This is todo 2", done: true },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
    {
      id: "550e8400-e29b-41d4-a716-346655440000",
      time: "16:15",
      title: "This is a long title for testing",
      icon: "🏃‍♂️",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "#ffffff66",
      tag: "Morning Routine",
      reminder: true,
      repeat: [1, 3, 6],
      todos: [
        { text: "This is todo 1", done: false },
        { text: "This is todo 2", done: true },
        { text: "This is todo 3", done: false },
      ],
      pomodoroTimer: [],
    },
  ],
};

function addNewTask(date, task) {
  console.log(task);
  console.log("Date parameter:", date, typeof date);
  console.log("Dates object keys:", Object.keys(dates));
  console.log("dates[date] exists?", dates[date]);
  console.log("Boolean check:", !dates[date]);
  // console.log(dates[date]);
  // if (!dates[date]) {
  //   dates[date] = [task];
  // } else {
  //   console.log("test");
  //   if (!dates[date].some((t) => t.time === task.time)) {
  //     dates[date].push(task);
  //   } else {
  //     console.log("Task with the same time already exists!");
  //   }
  // }
}

const initialState = {
  isMenuPanelOpen: false,
  isCalendarPanelOpen: false,
  isCreateTaskPanelOpen: false,
  isShortcutsPanelOpen: false,
  isEmojiPanelOpen: false,
  isPomodoroActive: false,
  isTodoItemActive: false,
  isStoragePersistent: true,
  currentTime: new Date(),
  currentDate: formatDate(new Date()),
  viewDate: formatDate(new Date()),
  sortedCards: [],
  currentTask: "",
  activeCard: 0,
  preferences: {
    theme: "light",
  },
  newTask: {
    id: "",
    time: "",
    date: "",
    title: "",
    icon: "",
    description: "",
    color: "#ffffff66",
    tag: "",
    reminder: false,
    repeat: [],
    todos: [],
    pomodoroTimer: {
      cycle: 4,
      work: 25,
      shortBreak: 5,
      longBreak: 15,
    },
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
      };
    case "toggleEmoji":
      return {
        ...state,
        isEmojiPanelOpen: !state.isEmojiPanelOpen,
      };
    case "changeTheme":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          theme: action.payload,
        },
      };
    case "closeAllPanels":
      return {
        ...state,
        isMenuPanelOpen: false,
        isCalendarPanelOpen: false,
        isCreateTaskPanelOpen: false,
        isShortcutsPanelOpen: false,
        isEmojiPanelOpen: false,
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

      return {
        ...state,
        viewDate: state.currentDate,
        activeCard: index,
      };
    }
    case "goToFirstTask":
      return {
        ...state,
        activeCard: 0,
      };
    case "goToLastTask":
      return {
        ...state,
        activeCard: state.sortedCards.length - 1,
      };
    case "togglePomodoro":
      return {
        ...state,
        isPomodoroActive: !state.isPomodoroActive,
      };
    case "addTodo":
      return {
        ...state,
        isTodoItemActive: true,
        newTask: {
          ...state.newTask,
          todos: [...state.newTask.todos, ""],
        },
      };
    case "deleteTodo": {
      const newTodos = state.newTask.todos.filter(
        (_, index) => index !== action.payload,
      );
      return {
        ...state,
        isTodoItemActive: newTodos.length > 0 ? true : false,
        newTask: {
          ...state.newTask,
          todos: newTodos,
        },
      };
    }
    case "updateNewTaskTodos": {
      const newTodos = state.newTask.todos.map((todo, index) =>
        index === action.index ? action.payload : todo,
      );
      return {
        ...state,
        newTask: {
          ...state.newTask,
          todos: newTodos,
        },
      };
    }
    case "updateNewTaskTime":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          time: action.payload,
        },
      };
    case "updateNewTaskTitle":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          title: action.payload,
        },
      };
    case "updateNewTaskIcon":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          icon: action.payload,
        },
      };
    case "updateNewTaskDescription":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          description: action.payload,
        },
      };
    case "updateNewTaskColor":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          color: action.payload + "66",
        },
      };
    case "updateNewTaskTag":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          tag: action.payload,
        },
      };
    case "updateNewTaskReminder":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          reminder: action.payload,
        },
      };
    case "updateNewTaskRepeat":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          repeat: action.payload,
        },
      };
    case "createNewTask": {
      const newTask = {
        ...state.newTask,
        id: crypto.randomUUID(),
        time: state.newTask.time || formatTime(new Date()),
        title: state.newTask.title || "Untitled",
        date: state.viewDate,
      };
      // console.log(newTask);
      addNewTask(state.viewDate, newTask);
      return {
        ...state,
        newTask: initialState.newTask,
        isCreateTaskPanelOpen: false,
        isTodoItemActive: false,
        isPomodoroActive: false,
      };
    }
    case "importData":
      console.log("Not available yet!");
      return {
        ...state,
      };
    case "exportData":
      console.log("Not available yet!");
      return {
        ...state,
      };
    case "setStoragePersistent":
      return {
        ...state,
        isStoragePersistent: action.payload,
      };
    case "tickClock": {
      const newCurrentTime = new Date();

      const newCurrentTask = state.sortedCards.reduce((latestTask, task) => {
        const taskDateTime = new Date(`${state.viewDate}T${task.time}:00`);

        if (taskDateTime <= newCurrentTime) {
          return task;
        }

        return latestTask;
      }, null);

      // Only scroll if task actually changed
      const taskChanged = state.currentTask?.id !== newCurrentTask?.id;

      const newActiveCard = taskChanged
        ? state.sortedCards.findIndex((obj) => obj.id === newCurrentTask?.id)
        : state.activeCard;

      return {
        ...state,
        currentTime: newCurrentTime,
        currentTask: newCurrentTask,
        activeCard: newActiveCard,
        viewDate: taskChanged ? state.currentDate : state.viewDate,
      };
    }
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
      isEmojiPanelOpen,
      currentDate,
      viewDate,
      activeCard,
      sortedCards,
      currentTask,
      isPomodoroActive,
      isTodoItemActive,
      newTask,
      preferences,
      isStoragePersistent,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const currentTaskIndex = sortedCards.findIndex(
    (obj) => obj.id === currentTask?.id,
  );

  const isCurrentTaskToday =
    currentTaskIndex === activeCard && currentDate === viewDate;

  const durations = useMemo(
    () =>
      sortedCards.map((card, index) =>
        getTimeDifference(card.time, sortedCards[index + 1]?.time || ""),
      ),
    [sortedCards],
  );

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

  // Timer for updating the current task ##########################################
  const scheduleNextUpdateRef = useRef(null);
  const timerRef = useRef(null);

  const updateAndSchedule = useCallback(() => {
    dispatch({ type: "tickClock" });

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

  // Mouse scroll handler #########################################################
  useEffect(() => {
    function handleScroll(e) {
      if (isMenuPanelOpen || isCalendarPanelOpen || isCreateTaskPanelOpen)
        return;

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
  }, [
    activeCard,
    sortedCards,
    isMenuPanelOpen,
    isCalendarPanelOpen,
    isCreateTaskPanelOpen,
  ]);

  // Keyboard shortcuts handler ###################################################
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

        if (event.key === "e") {
          event.preventDefault();
          console.log("Not implemented");
          // dispatch({ type: "goToCurrentTask" });
        }

        if (event.key === "r") {
          event.preventDefault();
          dispatch({ type: "goToCurrentTask" });
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

  // Return body of the provider ##################################################
  return (
    <StateContext.Provider
      value={{
        dispatch,
        currentDate,
        viewDate,
        cardsCount: dates[viewDate]?.length || 0,
        isMenuPanelOpen,
        isCreateTaskPanelOpen,
        isCalendarPanelOpen,
        isShortcutsPanelOpen,
        isEmojiPanelOpen,
        activeCard,
        sortedCards,
        currentTask,
        currentTaskIndex,
        isCurrentTaskToday,
        durations,
        isPomodoroActive,
        isTodoItemActive,
        newTask,
        preferences,
        isStoragePersistent,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
