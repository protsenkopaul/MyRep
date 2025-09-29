const fs = require("fs").promises;
const path = require("path");

const DB = path.resolve(__dirname, "tasks.json");

async function loadTasks() {
  try {
    const text = await fs.readFile(DB, "utf8");
    return JSON.parse(text);
  } catch {
    return [];
  }
}

async function saveTasks(tasks) {
  await fs.writeFile(DB, JSON.stringify(tasks, null, 2), "utf8");
}

module.exports = {
  loadTasks,
  saveTasks,
};
