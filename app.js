//Access Variables

const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter-options");

//Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", actionTodo);
filterOption.addEventListener("click", filterTodo);

//Code

var todos;
if (localStorage.getItem("todos") === null) {
    todos = [];
} else {
    todos = JSON.parse(localStorage.getItem("todos"));
}
    
//Functions

function getTodos() {
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const data = document.createElement("li");
        data.innerText = todo;
        data.classList.add("todo-item");
        todoDiv.appendChild(data);
        todoInput.value = "";
        //Completed Box
        const completedButton = document.createElement("button");
        completedButton.classList.add("completed-btn");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        todoDiv.appendChild(completedButton);
        //Trash Box
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        todoDiv.appendChild(trashButton);
        //Appending
        todoList.appendChild(todoDiv);
    });
}
function addTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const data = document.createElement("li");
    data.innerText = todoInput.value;
    saveTodos(todoInput.value);
    data.classList.add("todo-item");
    todoDiv.appendChild(data);
    //Completed Box
    const completedButton = document.createElement("button");
    completedButton.classList.add("completed-btn");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    todoDiv.appendChild(completedButton);
    //Trash Box
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    todoDiv.appendChild(trashButton);
    //appending
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function saveTodos(todo) {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function actionTodo(e){
    const item = e.target;
    const parent = item.parentElement;
    if (item.classList[0] === `trash-btn`) {
        parent.classList.add("fall");
        // Removing from desktop
        parent.addEventListener("transitionend", function () {
            parent.remove();
        });
        //Actually deleting from local storage
        const idx = parent.children[0].innerText; //got the li text (i.e stored in "todos")
        todos.splice(todos.indexOf(idx), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    if (item.classList[0] === `completed-btn`) {
        item.parentElement.classList.toggle("completed");
    }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}
