'use strict';
let businessElement = document.getElementById('business');
let listElement = document.getElementById('ToDoList');
let AddToListElement = document.getElementById('AddToList');
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const taskItemTemplate = document.getElementById('taskItemTemplate').innerHTML;


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
    const html = taskItemTemplate
        .replace('{{id}}', task.id)
        .replace('{{title}}', task.title)
        .replace('{{completeClass}}', task.completed ? 'done' : '');

    // taskList.innerHTML = taskList.innerHTML + html;

    const newTaskEl = htmlToElement(html);
    listElement.appendChild(newTaskEl);
}

function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}



