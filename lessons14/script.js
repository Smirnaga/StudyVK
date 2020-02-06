'use strict';
let businessElement = document.getElementById('business');
let listElement = document.getElementById('ToDoList');
let AddToListElement = document.getElementById('AddToList');
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';


getTodos();

function getTodos() {
    fetch(TODOS_URL)
        .then(response => response.json())
        .then(renderTodos);
}

function renderTodos(list) {
    list.forEach(AddLi);
}

AddToListElement.addEventListener('click', AddToList);

function AddToList(json) {
    json.preventDefault();
    const task = { title: businessElement.value };
    getTodos();
    AddLi(task);
}

 function AddLi(task) {
     listElement.innerHTML += `<li>${task.title}</li>`;
}; 

/*  listElement.addEventListener ('click', function(e)  {
    if (event.target.style.backgroundColor == 'yellow') event.target.classList.add("green");

    else event.target.classList.toggle("green");
    return false;
});  */


