function formatDate(date) {
  if (!date) return "";
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function shiftDate(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

function isDateFuture(currentDateString, viewDateString) {
  const currentDate = new Date(currentDateString);
  const viewDate = new Date(viewDateString);
  return viewDate.getTime() > currentDate.getTime();
}

export { formatDate, shiftDate, isDateFuture };
