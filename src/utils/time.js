function timeToSeconds(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 3600 + m * 60;
}

export { timeToSeconds };
