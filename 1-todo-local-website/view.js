const addBtn = document.getElementById("add-btn");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const delBtn = document.getElementById("clear-completed");
const activeTasks = document.getElementById("filter-active");
const allTasks = document.getElementById("filter-all");
const timeCosts = document.getElementById("time-costs");

function getInputValue() {
    return input.value.trim();
}

function clearInput() {
    input.value = "";
}

function redrawing(tasks) {
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "todo-item" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <div class="checkbox" data-id="${task.id}">${task.completed ? "✔️" : ""}</div>
      <div class="text">${task.text}</div>
      <div class="actions">
        <button class="delete" data-id="${task.id}">🗑️</button>
      </div>
      <div class="timestamp">
        Создано: ${new Date(task.creationDate).toLocaleString()}
        ${task.completed ? `<br>Завершено: ${new Date(task.completionDate).toLocaleString()}` : ""}
      </div>
    `;
    list.appendChild(li);
  });
}
export { input, addBtn, list, delBtn, allTasks, activeTasks, timeCosts, getInputValue, clearInput, redrawing };