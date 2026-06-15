import { formatTime } from "./time";

function normalizeTask(task, viewDate) {
  return {
    ...task,
    id: task.id || crypto.randomUUID(),
    time: task.time || formatTime(new Date()),
    title: task.title || "Untitled",
    date: task.date || viewDate,
    recurring: task.repeat?.length > 0 ? 1 : 0,
  };
}

export { normalizeTask };
