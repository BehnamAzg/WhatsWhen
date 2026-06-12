import { openDB } from "idb";

const DB_NAME = "whatswhen";
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("tasks")) {
      const taskStore = db.createObjectStore("tasks", {
        keyPath: "id",
      });
      // Fast lookup for tasks:
      taskStore.createIndex("date", "date");
      taskStore.createIndex("recurring", "recurring");
    }

    if (!db.objectStoreNames.contains("preferences")) {
      db.createObjectStore("preferences");
    }
  },
});

async function getDB() {
  return dbPromise;
}

async function addTask(taskObj) {
  try {
    const db = await getDB();

    const task = {
      ...taskObj,
      recurring: taskObj.repeat?.length > 0,
    };

    await db.add("tasks", task);
  } catch (err) {
    console.error("addTask:", err.message);
  }
}

async function updateTask(taskObj) {
  try {
    const db = await getDB();

    const task = {
      ...taskObj,
      recurring: taskObj.repeat?.length > 0,
    };

    await db.put("tasks", task);
  } catch (err) {
    console.error("updateTask:", err.message);
  }
}

function shouldTaskAppearOnDate(taskObj, date) {
  const taskDate = new Date(date);

  if (taskObj.recurring) {
    return taskObj.repeat.includes(taskDate.getDay());
  }

  return taskObj.date === date;
}

async function getTasks(date) {
  try {
    const db = await getDB();

    const onceTasks = await db.getAllFromIndex("tasks", "date", date);

    const recurringTasks = await db.getAllFromIndex("tasks", "recurring", true);

    const tasks = [
      ...onceTasks,
      ...recurringTasks.filter((task) => shouldTaskAppearOnDate(task, date)),
    ];

    return tasks.sort((a, b) => a.time.localeCompare(b.time));
  } catch (err) {
    console.error("getTasks:", err.message);
    return [];
  }
}

async function deleteTask(taskId) {
  try {
    const db = await getDB();
    await db.delete("tasks", taskId);
  } catch (err) {
    console.error("deleteTask:", err.message);
  }
}

async function getPreferences() {
  try {
    const db = await getDB();
    return (await db.get("preferences", "app")) ?? { theme: "light" };
  } catch (err) {
    console.error("getPreferences:", err.message);
    return { theme: "light" };
  }
}

async function setPreferences(newPreferences) {
  try {
    const db = await getDB();
    await db.put("preferences", newPreferences, "app");
  } catch (err) {
    console.error("setPreferences:", err.message);
  }
}

export { addTask, updateTask, getTasks, deleteTask, getPreferences, setPreferences };
