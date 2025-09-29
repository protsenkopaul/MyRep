// const addBtn = document.getElementById("add-btn");
// const input = document.getElementById("todo-input");
// const list = document.getElementById("todo-list");
// const delBtn = document.getElementById("clear-completed");
// const activeTasks = document.getElementById("filter-active");
// const allTasks = document.getElementById("filter-all");
// const timeCosts = document.getElementById("time-costs");

// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// addBtn.addEventListener("click", () => {
//   const text = input.value.trim();

//   if (text !== "") {
//     const newTask = {
//       id: Date.now(),
//       text: text,
//       completed: false,
//       creationDate: new Date(),
//       completionDate: null

//     }
//     tasks.push(newTask);
//     saveTasks();
//     redrawing(tasks);

//     console.log("Добавлена задача:", text);
//     input.value = "";
//   }
// });

// input.addEventListener("keyup", (event) => {
//   if (event.key === "Enter") {
//     addBtn.click();
//   }
// });

// function saveTasks() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// list.addEventListener("click", (event) => {
//   if (event.target.classList.contains("delete")) {
//     const id = Number(event.target.dataset.id);
//     tasks = tasks.filter(task => task.id !== id);
//     saveTasks();
//     redrawing(tasks);
//   }
// });

// list.addEventListener("click", (event) => {
//   if (event.target.classList.contains("checkbox")) {
//     const id = Number(event.target.dataset.id);
//     task = tasks.find(task => task.id === id);
//     if (task) {
//       task.completed = !task.completed;
//       if (task.completed) {
//         task.completionDate = new Date();
//       } else {
//         task.completionDate = null;
//       }
//       saveTasks();
//       redrawing(tasks);
//     }
//   }
// });

// delBtn.addEventListener("click", () => {
//   tasks = tasks.filter(task => task.completed !== true);
//   saveTasks();
//   redrawing(tasks);
// });

// activeTasks.addEventListener("click", () => {
//   const active = tasks.filter(task => task.completed !== true);
//   activeTasks.innerHTML = '';
//   activeTasks.innerHTML = '<button id="filter-active" class="active" role="tab">Активные</button>';
//   allTasks.innerHTML = '';
//   allTasks.innerHTML = '<button id="filter-all" class="passive" role="tab">Все</button>';
//   saveTasks();
//   redrawing(active);
// });

// allTasks.addEventListener("click", () => {
//   allTasks.innerHTML = '';
//   allTasks.innerHTML = '<button id="filter-all" class="active" role="tab">Все</button>';
//   activeTasks.innerHTML = '';
//   activeTasks.innerHTML = '<button id="filter-active" class="passive" role="tab">Активные</button>';
//   saveTasks();
//   redrawing(tasks);
// });

// timeCosts.addEventListener("click", () => {
//   timeCosts.innerHTML = "Среднее время: " + averageTimeCosts(tasks);
// });

// function averageTimeCosts(tasks) {
//   let totalTime = 0;
//   let taskCounter = 0;
//   tasks.forEach(task => {
//     const diff = task.completionDate - task.creationDate;
//     totalTime += diff;
//     taskCounter++;
//   });
//   if (taskCounter === 0) {
//     return 0;
//   }
//   const averageCosts = totalTime / taskCounter;

//   const hours = Math.floor(averageCosts / (1000 * 60 * 60));
//   const minutes = Math.floor((averageCosts % (1000 * 60 * 60)) / (1000 * 60));

//   return `${hours} ч ${minutes} мин`;
// }

// function redrawing(tasks) {
//   list.innerHTML = "";
//   tasks.forEach(task => {
//     const li = document.createElement("li");
//     li.className = "todo-item" + (task.completed ? " completed" : "");
//     li.innerHTML = `
//       <div class="checkbox" data-id="${task.id}">${task.completed ? "✔️" : ""}</div>
//       <div class="text">${task.text}</div>
//       <div class="actions">
//         <button class="delete" data-id="${task.id}">🗑️</button>
//       </div>
//       <div class="timestamp">
//         Создано: ${new Date(task.creationDate).toLocaleString()}
//         ${task.completed ? `<br>Завершено: ${new Date(task.completionDate).toLocaleString()}` : ""}
//       </div>
//     `;
//     list.appendChild(li);
//   });
// }
// redrawing(tasks);
import { run } from "./controller.js";
run();