function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString();
}

function durationMs(ms) {
  if (!Number.isFinite(ms) || ms < 0) return "0m";
  const days = Math.floor(ms / (24*3600*1000));
  ms %= 24*3600*1000;
  const hours = Math.floor(ms / (3600*1000));
  ms %= 3600*1000;
  const mins = Math.floor(ms / (60*1000));
  const parts = [];
  if (days) parts.push(days + "d");
  if (hours) parts.push(hours + "h");
  if (mins || parts.length === 0) parts.push(mins + "m");
  return parts.join(" ");
}

module.exports = { formatDate, durationMs };