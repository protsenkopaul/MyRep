let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text) {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    creationDate: new Date(),
    completionDate: null
  };
  tasks.push(newTask);
  saveTasks();
}

function markTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      if (task.completed) {
        task.completionDate = new Date();
      } else {
        task.completionDate = null;
      }
      saveTasks();
    }
}
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
}

function clearCompleted(){
     tasks = tasks.filter(task => task.completed !== true);
     saveTasks();
}

function getActiveTasks() {
    return tasks.filter(task => task.completed !== true);
}

function getCompleteTasks() {
    return tasks.filter(task => task.completed === true);
}

function getAllTasks() {
  return tasks;
}

function averageTimeCosts(tasks) {
  let totalTime = 0;
  let taskCounter = 0;
  tasks.forEach(task => {
    const diff = task.completionDate - task.creationDate;
    totalTime += diff;
    taskCounter++;
  });
  if (taskCounter === 0) {
    return 0;
  }
  const averageCosts = totalTime / taskCounter;

  const hours = Math.floor(averageCosts / (1000 * 60 * 60));
  const minutes = Math.floor((averageCosts % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours} ч ${minutes} мин`;
}
export { addTask, markTask, deleteTask,getCompleteTasks, clearCompleted, getActiveTasks, getAllTasks, averageTimeCosts };