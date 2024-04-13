const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskEmpty = document.querySelector("#taskEmpty");
const doneList = document.querySelector("#doneList");

let addCounterTask = document.querySelector("#addCounterTask");
let addCounterDone = document.querySelector("#addCounterDone");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);
doneList.addEventListener("click", deleteDone);

let taskCounter = 0;
let doneCounter = 0;

let tasks = [];

if (localStorage.getItem("tasks")) {

  tasks = (JSON.parse(localStorage.getItem("tasks")));
  console.log(tasks);
}

tasks.forEach(task => {
  let cssClass = task.done ? "task__item done-item" : "task__item"
  // ///////////////////////////////////////////////////////////////////////

  let taskHTML = ` <li id=${task.id} class="${cssClass}">
    <span class="task__title">${task.text}</span>
    <div class="buttons">
      <button id="taskDone" class="task__done " data-action="done">
        <img src="./img/done.svg" alt="">
      </button>
      <button id="taskDelete" class="task__delete " data-action="delete">
        <img src="./img/delete.svg" alt="">
      </button>
    </div>
  </li>`

  taskList.insertAdjacentHTML("beforeend", taskHTML);
});

function addTask(event) {

  event.preventDefault();

  let taskText = taskInput.value;

  // Работа с данными
  let newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  saveToLocalStorage()

  let cssClass = newTask.done ? "task__item done-item" : "task__item"
  // ///////////////////////////////////////////////////////////////////////

  let taskHTML = ` <li id=${newTask.id} class="${cssClass}">
    <span class="task__title">${newTask.text}</span>
    <div class="buttons">
      <button id="taskDone" class="task__done " data-action="done">
        <img src="./img/done.svg" alt="">
      </button>
      <button id="taskDelete" class="task__delete " data-action="delete">
        <img src="./img/delete.svg" alt="">
      </button>
    </div>
  </li>`

  if (taskInput.value == 0) {
    return;
  };

  taskList.insertAdjacentHTML("beforeend", taskHTML);

  taskInput.value = "";
  taskInput.focus();

  if (taskList.children.length > 1) {
    taskEmpty.classList.add("none");
  }
  taskCounter++;
  addCounterTask.innerHTML = taskCounter;

}


function deleteTask(event) {

  if (event.target.dataset.action !== "delete") {
    return;
  }

  let parentNode = event.target.closest(".task__item");

  // Работа с  данными
  // находим ID задачи

  let id = parentNode.id;

  // Находим и удаляем задачу через   

  tasks = tasks.filter((task) => task.id != id);
  saveToLocalStorage();

  // ////////////////////////////////////////////////

  parentNode.remove();

  if (taskList.children.length === 1) {
    taskEmpty.classList.remove("none");
  }

  taskCounter--;
  addCounterTask.innerHTML = taskCounter;
}


function doneTask(event) {

  if (event.target.dataset.action !== "done") return;

  let parentNode = event.target.closest(".task__item");

  // Работа с данными
  let id = parentNode.id;
  let task = tasks.find(task => task.id == id);
  task.done = !task.done

  task.done && parentNode.classList.add("done-item");
  // /////////////////////////////

  event.target.style.display = "none";

  doneList.insertAdjacentHTML("beforeend", parentNode.outerHTML);
  saveToLocalStorage();
  parentNode.remove();

  if (taskList.children.length === 1) {
    taskEmpty.classList.remove("none");
  }

  taskCounter--;
  addCounterTask.innerHTML = taskCounter;

  doneCounter++;
  addCounterDone.innerHTML = doneCounter;
}

function deleteDone(event) {

  if (event.target.dataset.action !== "delete") {
    return;
  }

  let parentNode = event.target.closest(".task__item");

  // Работа с  данными
  // находим ID задачи

  let id = parentNode.id;

  // Находим и удаляем задачу через   

  tasks = tasks.filter((task) => task.id != id);

  saveToLocalStorage();
  // /////////////////////////////////////////////

  parentNode.remove();

  doneCounter--;
  addCounterDone.innerHTML = doneCounter;
}


function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(JSON.stringify(tasks));
}