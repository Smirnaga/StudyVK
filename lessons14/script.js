'use strict';
let businessElement = document.getElementById('business');
let listElement = document.getElementById('ToDoList');
let AddToListElement = document.getElementById('AddToList');
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const Li = document.getElementsByTagName('li');


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
        if (task.completed == true) {
            createItem(task); 
            Li.classList.add("done");
        } else {
            createItem(task);
        }
    }

function createItem(task) {
    listElement.innerHTML += `<li>${task.title}</li>`;
}



