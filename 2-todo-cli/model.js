const { loadTasks, saveTasks } = require("./service");

async function addTask(text) {
  const tasks = await loadTasks();
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
}

async function listTasks() {
  return await loadTasks();
}

async function toggleDone(id) {
  const tasks = await loadTasks();
  const idx = tasks.findIndex(t => String(t.id) === String(id));
  if (idx === -1) return null;
  tasks[idx].completed = !tasks[idx].completed;
  tasks[idx].completedAt = tasks[idx].completed ? new Date().toISOString() : null;
  await saveTasks(tasks);
  return tasks[idx];
}

async function deleteTask(id) {
  let tasks = await loadTasks();
  const before = tasks.length;
  tasks = tasks.filter(t => String(t.id) !== String(id));
  if (tasks.length === before) return false;
  await saveTasks(tasks);
  return true;
}

async function clearCompleted() {
  let tasks = await loadTasks();
  const before = tasks.length;
  tasks = tasks.filter(t => !t.completed);
  await saveTasks(tasks);
  return before - tasks.length;
}

async function stats() {
  const tasks = await loadTasks();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed && t.completedAt).length;
  const active = total - completed;

  const diffs = tasks
    .filter(t => t.completed && t.completedAt)
    .map(t => new Date(t.completedAt) - new Date(t.createdAt));

  const avgMs = diffs.length ? Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length) : 0;

  return { total, completed, active, avgMs };
}

module.exports = { addTask, listTasks, toggleDone, deleteTask, clearCompleted, stats };