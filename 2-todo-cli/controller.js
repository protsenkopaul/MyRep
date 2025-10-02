const model = require("./model");

async function addTask(text) {
  return await model.addTask(text);
}

async function listTasks() {
  return await model.listTasks();
}

async function toggleDone(id) {
  return await model.toggleDone(id);
}

async function deleteTask(id) {
  return await model.deleteTask(id);
}

async function clearCompleted() {
  return await model.clearCompleted();
}

async function stats() {
  return await model.stats();
}

module.exports = { addTask, listTasks, toggleDone, deleteTask, clearCompleted, stats }