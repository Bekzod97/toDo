const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const doneList = document.querySelector("#doneList");

let addCounterTask = document.querySelector("#addCounterTask");
let addCounterDone = document.querySelector("#addCounterDone");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);
doneList.addEventListener("click", deleteDone);

let tasks = [];
let dones = [];

checkEmpty()

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(localStorage.getItem("tasks"));
}

if (localStorage.getItem("dones")) {
  dones = JSON.parse(localStorage.getItem("dones"));
  console.log(localStorage.getItem("dones"));
}

tasks.forEach(item => {
  let taskHTML = ` <li id=${item.id} class="task__item">
  <span class="task__title">${item.text}</span>
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
  checkEmpty();

  addCounterTask.innerHTML = tasks.length;
})

dones.forEach(item => {
  let taskHTML = ` <li id=${item.id} class="task__item done-item">
  <span class="task__title">${item.text}</span>
  <div class="buttons">

    <button id="taskDelete" class="task__delete " data-action="delete">
      <img src="./img/delete.svg" alt="">
    </button>
  </div>
</li>`

  doneList.insertAdjacentHTML("beforeend", taskHTML);

  addCounterDone.innerHTML = dones.length;

})

function addTask(event) {
  
  event.preventDefault();

  let taskText = taskInput.value;

  if (taskText == 0) {
    return;
  };

  // Определяем обьект 
  let newTask = {
    id: Date.now(),
    text: taskText
  }

  tasks.push(newTask)

  let taskHTML = ` <li id=${newTask.id} class="task__item">
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

  taskList.insertAdjacentHTML("beforeend", taskHTML);

  tasksSaveToLocalStorage();

  taskInput.value = "";
  taskInput.focus();

  checkEmpty();

  addCounterTask.innerHTML = tasks.length;
}

function deleteTask(event) {

  if (event.target.dataset.action !== "delete") {
    return;
  }

  let parentNode = event.target.closest(".task__item");

  // Работа с данными

  let id = +parentNode.id;

  tasks = tasks.filter(item => item.id !== id);
  // /////////////////////////////

  parentNode.remove();

  checkEmpty();
  tasksSaveToLocalStorage();

  addCounterTask.innerHTML = tasks.length;
}

function doneTask(event) {

  if (event.target.dataset.action !== "done") return;

  let parentNode = event.target.closest(".task__item");

  // Работаем с данными
  let id = +parentNode.id;

  let newDone = {
    id: id,
    text: parentNode.innerText
  }

  dones.push(newDone)

  tasks = tasks.filter(item => item.id !== id);
  // /////////////////////////////

  parentNode.classList.add("done-item");
  event.target.style.display = "none";

  doneList.insertAdjacentHTML("beforeend", parentNode.outerHTML);

  parentNode.remove();

  checkEmpty();
  donesSaveToLocalStorage();
  tasksSaveToLocalStorage();

  addCounterTask.innerHTML = tasks.length;
  addCounterDone.innerHTML = dones.length;
}

function deleteDone(event) {

  if (event.target.dataset.action !== "delete") {
    return;
  }

  let parentNode = event.target.closest(".task__item");

  // Работаем с данными

  let id = +parentNode.id;
  dones = dones.filter(item => item.id !== id);

  // /////////////////////

  parentNode.remove();

  donesSaveToLocalStorage();

  addCounterDone.innerHTML = dones.length;

}

function checkEmpty() {

  if (tasks.length == 0) {

    let emptyListHTML = `<li id="taskEmpty" class="task__empty task__item ">
                          <img src="./img/emptyTask.svg" alt="empty" width="20px">
                          <div>Task Empty</div>
                     </li>`

    taskList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {

    let emptyListElem = document.querySelector("#taskEmpty");
    emptyListElem ? emptyListElem.remove() : null;
  }
}

function tasksSaveToLocalStorage() {

  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function donesSaveToLocalStorage() {
  localStorage.setItem("dones", JSON.stringify(dones));
}
