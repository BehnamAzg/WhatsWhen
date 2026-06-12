function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

function timeToSeconds(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 3600 + m * 60;
}

function getTimeDifference(time1, time2) {
  if (time1 && time2) {
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);
    const totalMinutes1 = h1 * 60 + m1;
    const totalMinutes2 = h2 * 60 + m2;
    let diff = Math.abs(totalMinutes2 - totalMinutes1);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return {
      nextTaskTime: time2,
      formatted: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`,
    };
  }
  return {
    totalSeconds: 0,
    formatted: "--:--:--",
  };
}

function calculateRemainingSeconds(targetDate) {
  if (!targetDate) return null;
  const now = new Date();
  // If target time has passed today, schedule for tomorrow
  if (targetDate <= now) {
    targetDate.setDate(targetDate.getDate() + 1);
  }
  return Math.max(0, Math.floor((targetDate - now) / 1000));
}

function formatCountdownTime(seconds) {
  if (seconds === null || seconds === undefined) return "--:--:--";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export {
  formatTime,
  timeToSeconds,
  getTimeDifference,
  formatCountdownTime,
  calculateRemainingSeconds,
};
