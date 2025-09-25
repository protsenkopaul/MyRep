import * as model from "./model.js";
import * as view from "./view.js";

function run() {

  view.redrawing(model.getAllTasks());

  view.addBtn.addEventListener("click", () => {
    const text = view.getInputValue();
    if (!text) return;
    model.addTask(text);
    view.clearInput();
    view.redrawing(model.getAllTasks());
  });

  view.input.addEventListener("keyup", e => {
    if (e.key === "Enter") view.addBtn.click();
  });

  view.list.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
      model.deleteTask(Number(e.target.dataset.id));
      view.redrawing(model.getAllTasks());
    }
    if (e.target.classList.contains("checkbox")) {
      model.markTask(Number(e.target.dataset.id));
      view.redrawing(model.getAllTasks());
    }
  });

  view.delBtn.addEventListener("click", () => {
    model.clearCompleted();
    view.redrawing(model.getAllTasks());
  });

  view.activeTasks.addEventListener("click", () => {
    view.redrawing(model.getActiveTasks());
  });

  view.allTasks.addEventListener("click", () => {
    view.redrawing(model.getAllTasks());
  });

  view.timeCosts.addEventListener("click", () => {
    view.timeCosts.innerHTML = "Среднее время: " + model.averageTimeCosts(model.getCompleteTasks());
  });
}
export { run };