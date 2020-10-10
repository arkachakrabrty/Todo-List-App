//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoSearch = document.querySelector('.todo-search')

//Event Listeners

document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
todoSearch.addEventListener('input',searchTodo);

//Functions

function addTodo(event){

    //Prevent form from submitting
    event.preventDefault();

    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Adding todo to Local Storage
    saveLocalTodos(todoInput.value);

    //Check-mark button
    const completedButton =  document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Delete button
    const trashButton =  document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to List
    todoList.appendChild(todoDiv);

    //Clear values
    todoInput.value = "";
}

//function for deleting item

function deleteCheck(e){
    const item = e.target;

    //Deleting
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    //implementing checkmark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//function for local storage

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check-mark button
        const completedButton =  document.createElement('button');
        completedButton.innerHTML = '<i class= "fas fa-check"></i>'
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //Delete button
        const trashButton =  document.createElement('button');
        trashButton.innerHTML = '<i class= "fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Append to List
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function searchTodo(s){
    search = todoSearch.value.toLowerCase();
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        let Input = todo.childNodes[0].innerHTML.toLowerCase();
        result = Input.indexOf(search);
        
        
		if (search == '') {
			todo.style.display = 'flex';
        } 
        else if (result == -1) {
			todo.style.display = 'none';
        } 
        else {
			todo.style.display = 'flex';
		}
    });
}