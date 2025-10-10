const express = require("express");
const ctrl = require("./controller");

const app = express();
app.use(express.json());

app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const task = await ctrl.addTask(text);
  res.json(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await ctrl.listTasks();
  res.json(tasks);
});

app.patch("/tasks/:id", async (req, res) => {
  const task = await ctrl.toggleDone(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const ok = await ctrl.deleteTask(req.params.id);
  if (!ok) return res.status(404).json({ error: "Task not found" });
  res.json({ deleted: true });
});

app.delete("/tasks", async (req, res) => {
  const count = await ctrl.clearCompleted();
  res.json({ cleared: count });
});

app.get("/stats", async (req, res) => {
  const stats = await ctrl.stats();
  res.json(stats);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));