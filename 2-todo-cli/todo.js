const ctrl = require("./controller");

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  switch (cmd) {
    case "add":
      const text = args.slice(1).join(" ").trim();
      if (!text) return console.log("Использование: node todo.js add \"текст\"");
      await ctrl.addTask(text);
      break;
    case "list":
      await ctrl.listTasks();
      break;
    case "done":
      if (!args[1]) return console.log("Использование: node todo.js done <id>");
      await ctrl.toggleDone(args[1]);
      break;
    case "delete":
    case "del":
      if (!args[1]) return console.log("Использование: node todo.js delete <id>");
      await ctrl.deleteTask(args[1]);
      break;
    case "clear":
      await ctrl.clearCompleted();
      break;
    case "stats":
      await ctrl.stats();
      break;
    default:
      console.log("Команды: add, list, done <id>, delete <id>, clear, stats");
  }
}

main();