function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString();
}

function durationMsToHuman(ms) {
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

function printTasks(tasks) {
  if (!tasks.length) {
    console.log("Список пуст.");
    return;
  }
  console.log("=== ToDo ===");
  for (const t of tasks) {
    console.log(
      `${t.completed ? "[x]" : "[ ]"} ${t.id} — ${t.text}\n    created: ${formatDate(t.createdAt)}${t.completed ? `; done: ${formatDate(t.completedAt)}; took: ${durationMsToHuman(new Date(t.completedAt) - new Date(t.createdAt))}` : ""}`
    );
  }
}

function printStats(total, completed, active, avgTime) {
  console.log("Статистика:");
  console.log("  Всего:", total);
  console.log("  Выполнено:", completed);
  console.log("  Активных:", active);
  console.log("  Среднее время выполнения:", avgTime);
}

module.exports = {
  printTasks,
  printStats,
  durationMsToHuman,
};