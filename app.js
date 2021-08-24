//sections 
let todoInput=document.querySelector(".todo-input")
let todoButton=document.querySelector(".todo-btn")
let todoList=document.querySelector(".todo-list")
let filterOption=document.querySelector(".filter-todo")






//eventListerners 
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addToDo)
todoList.addEventListener("click", delteCheck)
filterOption.addEventListener("click", filterTodo )



//functions

//Adding a task 
function addToDo(event){
    //prevent form from sumbmitting
event.preventDefault()
  //todo Div
  let todoDiv=document.createElement("div");
  todoDiv.classList.add("todo");

  //LI
  let newtoDo= document.createElement("li")
  newtoDo.innerText= todoInput.value;
  newtoDo.classList.add("todo-item")
  todoDiv.appendChild(newtoDo)
//Save local Storage
 saveLocalTodos(todoInput.value);

  //Checkmarked

  let completedButton=document.createElement("button")
  completedButton.innerHTML=' <i class="fas fa-check"><i>'
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton)

//Trash Button
  let trashButton=document.createElement("button")
  trashButton.innerHTML=' <i class="fas fa-trash"><i>'
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton)

  //Append toDO list
  todoList.appendChild(todoDiv)

  //Clear ToDo Input Value
  todoInput.value="";
}

//Deleting a task
function delteCheck(event){
let item=event.target;
//Delete
if(item.classList[0]==="trash-btn"){
    let todo=item.parentElement;
    //Animation class
    todo.classList.add("fall")
     removeLocalTodos(todo);
    todo.addEventListener("transitionend", function(){
        todo.remove();
    })
}
//Check mark

if(item.classList[0]==="complete-btn"){
let todo=item.parentElement;
todo.classList.toggle("completed")
}
}

//filter
function filterTodo(event){
    let todos = document.querySelectorAll('.todo');  // find childrens with selector all
 
     todos.forEach((todo) => {
    switch(event.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  })
}

function saveLocalTodos(todo){
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}