// let todos = [];
let filterValue = "all";
let todoTitles = [];

// SELECT
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

const selectFilter = document.querySelector(".filter-todo");

const closeModalBtn = document.querySelectorAll(".close-modal");
const backDrop = document.querySelector(".backdrop");
const warningModal = document.querySelector(".warning-modal");

const editModal = document.querySelector(".edit-modal");
const editForm = document.querySelector(".edit-form");
const editInput = document.querySelector(".edit-input");

// EVENTS

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  renderTodos(todos);
});
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

closeModalBtn.forEach((btn) => {
  btn.addEventListener("click", closeModal);
});
backDrop.addEventListener("click", closeModal);

// FUNCTIONS
function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value.trim()) return null;

  const newTodo = {
    id: Date.now(),
    createdTime: new Date(),
    title: todoInput.value,
    isCompleted: false,
    completedDate: false,
    updatedDate: false,
  };

  const todos = getAllTodos();

  let todoTitles = todos.map((a) => a.title.trim()); // create array of titles

  if (todoTitles.includes(newTodo.title.trim())) {
    showWarningModal();
  } else {
    // todos.push(newTodo);
    saveTodo(newTodo);
  }

  filterTodos();
}

function renderTodos(todos) {
  // Create todos on DOM
  let results = "";

  const options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  todos.forEach((todo) => {
    results += `<li class="todo ${todo.isCompleted && "light "}">
        <p class="todo-title ${todo.isCompleted && "completed"}"> Title: <i>${
      todo.title
    }</i></p>
        <div class="todo-detail">
        <div class="todo-Time">
          <span class="todo-createTime ">Created: ${new Date(
            todo.createdTime
          ).toLocaleDateString("en-CA", options)}  _ ${String(
      new Date(todo.createdTime).toLocaleTimeString("en-CA")
    )}</span>

    <span class="todo-updatedDate ${
      !todo.updatedDate && "hidden"
    } }">Updated: ${new Date(todo.updatedDate).toLocaleDateString(
      "en-CA",
      options
    )}  _ ${String(
      new Date(todo.updatedDate).toLocaleTimeString("en-CA")
    )}</span>

          <span class="todo-completedDate ${
            !todo.completedDate && "hidden"
          }">Completed: ${new Date(todo.completedDate).toLocaleDateString(
      "en-CA",
      options
    )}  _ ${String(
      new Date(todo.completedDate).toLocaleTimeString("en-CA")
    )}</span>
          </div>
          <button class="todo__edit" data-todo-id=${
            todo.id
          }><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="todo__check" data-todo-id=${
            todo.id
          }><i class="fa-regular ${
      todo.isCompleted && "fa-solid"
    } fa-square-check"></i></button>
          <button class="todo__delete" data-todo-id=${
            todo.id
          }><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </li>`;
  });

  todoList.innerHTML = results;
  todoInput.value = ""; // Cleans the input text in form\

  t = todos.map((a) => a.title.trim());

  const deleteBtns = [...document.querySelectorAll(".todo__delete")];
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", deleteTodo);
  });

  const checkBtns = document.querySelectorAll(".todo__check");
  checkBtns.forEach((btn) => {
    btn.addEventListener("click", checkTodo);
  });

  const editBtns = [...document.querySelectorAll(".todo__edit")];
  editBtns.forEach((btn) => {
    btn.addEventListener("click", editTodo);
  });
}

function filterTodos() {
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      renderTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => {
        return t.isCompleted;
      });

      renderTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => {
        return !t.isCompleted;
      });

      renderTodos(filteredTodos);
      break;
    }

    default:
      renderTodos(todos);
  }
}

function deleteTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id != todoId);
  saveALLTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id == todoId);
  todo.isCompleted = !todo.isCompleted;
  todo.completedDate = new Date();
  if (!todo.isCompleted) {
    todo.completedDate = false;
  }
  saveALLTodos(todos);
  filterTodos();
}

function editTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id == todoId);

  const todoT = todos.map((a) => a.title.trim());

  showEditModal(todo.title);
  editForm.addEventListener("submit", editfunc);
  function editfunc(e) {
    e.preventDefault();

    if (!todoT.includes(editInput.value.trim())) {
      todo.title = editInput.value.trim();
      todo.updatedDate = new Date();
      saveALLTodos(todos);
      filterTodos();
      closeModal();
    } else {
      closeModal();
      showWarningModal();
    }
    editForm.removeEventListener("submit", editfunc);
    editInput.value = "";
  }
}

function closeModal() {
  warningModal.classList.add("hidden");
  editModal.classList.add("hidden");
  backDrop.classList.add("hidden");
}
// Get the input element by its ID
const inputField = document.getElementById('edit-input');

// Set a new value to the input field

function showEditModal(t) {
  editInput.value = t;
  editModal.classList.remove("hidden");
  backDrop.classList.remove("hidden");
}

function showWarningModal() {
  warningModal.classList.remove("hidden");
  backDrop.classList.remove("hidden");
}

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveALLTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
