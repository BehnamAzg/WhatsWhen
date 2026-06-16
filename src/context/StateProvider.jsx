import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { formatDate, shiftDate, isDateFuture } from "../utils/date";
import { getTimeDifference } from "../utils/time";
import { normalizeTask } from "../utils/task";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getPreferences,
  setPreferences,
} from "../data/db";
import StateContext from "./StateContext";

/*
const dates = {
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
  ],
};
*/

const initialState = {
  isMenuPanelOpen: false,
  isCalendarPanelOpen: false,
  isCreateTaskPanelOpen: false,
  isShortcutsPanelOpen: false,
  isEmojiPanelOpen: false,
  isPomodoroActive: false,
  isTodoItemActive: false,
  isStoragePersistent: true,
  isDeletePanelOpen: false,
  isLoading: false,
  currentTime: new Date(),
  currentDate: formatDate(new Date()),
  viewDate: formatDate(new Date()),
  sortedCards: [],
  currentTask: "",
  activeCard: 0,
  selectedTask: {},
  taskMode: "",
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
    recurring: 0,
    repeat: [],
    todos: [],
    isPomodoroTimer: false,
    pomodoroTimer: {
      cycle: 4,
      focus: 25,
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
        isDeletePanelOpen: false,
      };
    case "toggleCalendar":
      return {
        ...state,
        isCalendarPanelOpen: !state.isCalendarPanelOpen,
        isMenuPanelOpen: false,
        isCreateTaskPanelOpen: false,
        isShortcutsPanelOpen: false,
        isDeletePanelOpen: false,
      };
    case "toggleCreateTask":
      return {
        ...state,
        isCreateTaskPanelOpen: !state.isCreateTaskPanelOpen,
        isMenuPanelOpen: false,
        isCalendarPanelOpen: false,
        isShortcutsPanelOpen: false,
        isDeletePanelOpen: false,
        taskMode: "create",
        newTask: initialState.newTask,
        isPomodoroActive: false,
      };
    case "toggleShortcuts":
      return {
        ...state,
        isShortcutsPanelOpen: !state.isShortcutsPanelOpen,
        isDeletePanelOpen: false,
      };
    case "toggleEmoji":
      return {
        ...state,
        isEmojiPanelOpen: !state.isEmojiPanelOpen,
      };
    case "toggleDeletePanel": {
      if (state.sortedCards.length <= 0)
        return {
          ...state,
          isDeletePanelOpen: false,
        };
      let selection = {};
      if (!state.isDeletePanelOpen) {
        selection = state.sortedCards[state.activeCard];
      }
      return {
        ...state,
        isDeletePanelOpen: !state.isDeletePanelOpen,
        isMenuPanelOpen: false,
        isCreateTaskPanelOpen: false,
        isCalendarPanelOpen: false,
        isShortcutsPanelOpen: false,
        selectedTask: selection,
      };
    }
    case "toggleEditTaskPanel": {
      if (state.sortedCards.length <= 0)
        return {
          ...state,
        };
      let selection = {};
      if (!state.isCreateTaskPanelOpen) {
        selection = state.sortedCards[state.activeCard];
      }
      return {
        ...state,
        isCreateTaskPanelOpen: !state.isCreateTaskPanelOpen,
        isMenuPanelOpen: false,
        isCalendarPanelOpen: false,
        isShortcutsPanelOpen: false,
        isDeletePanelOpen: false,
        isPomodoroActive: selection.isPomodoroTimer,
        isTodoItemActive: selection.todos.length > 0,
        selectedTask: selection,
        newTask: selection,
        taskMode: "edit",
      };
    }
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
        isDeletePanelOpen: false,
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
    case "goToCurrentTask": {
      const currentTask = state.sortedCards.reduce((latestTask, task) => {
        const taskDateTime = new Date(`${state.viewDate}T${task.time}:00`);

        if (taskDateTime <= state.currentTime) {
          return task;
        }

        return latestTask;
      }, null);

      const activeCard = state.sortedCards.findIndex(
        (obj) => obj.id === currentTask?.id,
      );

      return {
        ...state,
        currentTask,
        activeCard,
      };
    }
    case "jumpToCurrentTask": {
      if (state.viewDate !== state.currentDate) {
        return {
          ...state,
          viewDate: state.currentDate,
        };
      }

      const currentTask = state.sortedCards.reduce((latestTask, task) => {
        const taskDateTime = new Date(`${state.viewDate}T${task.time}:00`);
        return taskDateTime <= state.currentTime ? task : latestTask;
      }, null);

      const activeCard = state.sortedCards.findIndex(
        (obj) => obj.id === currentTask?.id,
      );

      return {
        ...state,
        currentTask,
        activeCard,
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
        newTask: {
          ...state.newTask,
          isPomodoroTimer: !state.isPomodoroActive,
        },
      };
    case "addTodo":
      return {
        ...state,
        isTodoItemActive: true,
        newTask: {
          ...state.newTask,
          todos: [
            ...state.newTask.todos,
            {
              text: "",
              done: false,
            },
          ],
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
    case "updateNewTaskPomodoro":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          pomodoroTimer: action.payload,
        },
      };
    case "finishCreateTask":
      return {
        ...state,
        newTask: initialState.newTask,
        isCreateTaskPanelOpen: false,
        isTodoItemActive: false,
        isPomodoroActive: false,
      };
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
    case "loadPreferences":
      return {
        ...state,
        preferences: action.payload,
      };
    case "setTasks":
      return {
        ...state,
        sortedCards: action.payload,
      };
    case "toggleIsLoading":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
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
      isDeletePanelOpen,
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
      isLoading,
      selectedTask,
      taskMode,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  /*
  useEffect(() => {
    async function init() {
      const prefs = await getPreferences();

      dispatch({
        type: "loadPreferences",
        payload: prefs,
      });
    }

    init();
  }, []);
  */

  // Tasks CRUD Operations ######################################################
  const loadTasks = useCallback(async (date) => {
    try {
      dispatch({ type: "toggleIsLoading" });
      const tasks = await getTasks(date);
      dispatch({
        type: "setTasks",
        payload: tasks,
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch({ type: "toggleIsLoading" });
    }
  }, []);

  useEffect(() => {
    loadTasks(viewDate);
  }, [viewDate, loadTasks]);

  async function createTask() {
    const task = normalizeTask(newTask, viewDate);

    // if (sortedCards.some((card) => card.time === task.time))
    //   return console.log("Task with the same time already exists!");

    console.log("From createTask: ", task);
    await addTask(task);
    await loadTasks(task.date);
    dispatch({ type: "finishCreateTask" });
  }

  async function removeTask(id, date) {
    await deleteTask(id);
    await loadTasks(date);
    dispatch({ type: "toggleDeletePanel" });
  }

  async function editTask(task) {
    await updateTask(task);
    await loadTasks(task.date);
  }

  // ############################################################################
  const currentTaskIndex = sortedCards.findIndex(
    (obj) => obj.id === currentTask?.id,
  );

  const selectedTaskIndex = sortedCards.findIndex(
    (obj) => obj.id === selectedTask?.id,
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
    if (!sortedCards.length) return;
    if (viewDate === currentDate) {
      return dispatch({ type: "goToCurrentTask" });
    } else if (isDateFuture(currentDate, viewDate)) {
      return dispatch({ type: "goToFirstTask" });
    } else {
      return dispatch({ type: "goToLastTask" });
    }
  }, [viewDate, currentDate, sortedCards]);

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
      if (
        isMenuPanelOpen ||
        isCalendarPanelOpen ||
        isCreateTaskPanelOpen ||
        isShortcutsPanelOpen ||
        isDeletePanelOpen
      )
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
    isShortcutsPanelOpen,
    isDeletePanelOpen,
  ]);

  // Keyboard shortcuts handler ###################################################
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isInputOrTextarea =
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.isContentEditable;

      if (!isInputOrTextarea) {
        if (event.key === "Escape") {
          event.preventDefault();
          dispatch({ type: "closeAllPanels" });
        }

        if (event.key === "Delete") {
          event.preventDefault();
          dispatch({ type: "toggleDeletePanel" });
        }

        if (isDeletePanelOpen) return;

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

        if (event.key === "r") {
          event.preventDefault();
          dispatch({ type: "jumpToCurrentTask" });
        }

        if (event.key === "/") {
          event.preventDefault();
          dispatch({ type: "toggleShortcuts" });
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
  }, [isDeletePanelOpen]);

  // Return body of the provider ##################################################
  return (
    <StateContext.Provider
      value={{
        dispatch,
        createTask,
        removeTask,
        currentDate,
        viewDate,
        cardsCount: sortedCards.length,
        isMenuPanelOpen,
        isCreateTaskPanelOpen,
        isCalendarPanelOpen,
        isShortcutsPanelOpen,
        isEmojiPanelOpen,
        isDeletePanelOpen,
        activeCard,
        sortedCards,
        currentTask,
        currentTaskIndex,
        selectedTaskIndex,
        isCurrentTaskToday,
        durations,
        isPomodoroActive,
        isTodoItemActive,
        newTask,
        preferences,
        isStoragePersistent,
        isLoading,
        selectedTask,
        taskMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
