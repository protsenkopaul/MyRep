const express = require("express");
const ctrl = require("./controller");

const app = express();
app.use(express.json());

// Добавить задачу
app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const task = await ctrl.addTask(text);
  res.json(task);
});

// Список задач
app.get("/tasks", async (req, res) => {
  const tasks = await ctrl.listTasks();
  res.json(tasks);
});

// Переключить done
app.patch("/tasks/:id", async (req, res) => {
  const task = await ctrl.toggleDone(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// Удалить задачу
app.delete("/tasks/:id", async (req, res) => {
  const ok = await ctrl.deleteTask(req.params.id);
  if (!ok) return res.status(404).json({ error: "Task not found" });
  res.json({ deleted: true });
});

// Очистить выполненные
app.delete("/tasks", async (req, res) => {
  const count = await ctrl.clearCompleted();
  res.json({ cleared: count });
});

// Статистика
app.get("/stats", async (req, res) => {
  const stats = await ctrl.stats();
  res.json(stats);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));