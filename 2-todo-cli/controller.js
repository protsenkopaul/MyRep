const { loadTasks, saveTasks } = require("./model");
const view = require("./view");

async function addTask(text) {
  const tasks = await loadTasks();
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  console.log("Добавлено:", newTask.id, "-", newTask.text);
}

async function listTasks() {
  const tasks = await loadTasks();
  view.printTasks(tasks);
}

async function toggleDone(id) {
  const tasks = await loadTasks();
  const idx = tasks.findIndex(t => String(t.id) === String(id));
  if (idx === -1) {
    console.log("Задача не найдена:", id);
    return;
  }
  tasks[idx].completed = !tasks[idx].completed;
  tasks[idx].completedAt = tasks[idx].completed ? new Date().toISOString() : null;
  await saveTasks(tasks);
  console.log(`Задача ${tasks[idx].completed ? "выполнена" : "возвращена в активные"}:`, tasks[idx].id);
}

async function deleteTask(id) {
  let tasks = await loadTasks();
  const before = tasks.length;
  tasks = tasks.filter(t => String(t.id) !== String(id));
  if (tasks.length === before) {
    console.log("Задача не найдена:", id);
    return;
  }
  await saveTasks(tasks);
  console.log("Удалено:", id);
}

async function clearCompleted() {
  let tasks = await loadTasks();
  const before = tasks.length;
  tasks = tasks.filter(t => !t.completed);
  await saveTasks(tasks);
  console.log("Очищено выполненных:", before - tasks.length);
}

async function stats() {
  const tasks = await loadTasks();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed && t.completedAt).length;
  const active = total - completed;
  const diffs = tasks
    .filter(t => t.completed && t.completedAt)
    .map(t => new Date(t.completedAt) - new Date(t.createdAt));
  const avgMs = diffs.length ? Math.round(diffs.reduce((a,b)=>a+b,0) / diffs.length) : 0;
  view.printStats(total, completed, active, view.durationMsToHuman(avgMs));
}

module.exports = {
  addTask,
  listTasks,
  toggleDone,
  deleteTask,
  clearCompleted,
  stats
};