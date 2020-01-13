'use strict';
let businessElement = document.getElementById('business');
let listElement = document.getElementById('ToDoList');
let AddToListElement = document.getElementById('AddToList');

AddToListElement.addEventListener('click', AddToList);

function AddToList(e) {
    e.preventDefault();
    AddLi();
    clear();
    focus();
}

function AddLi() {
    listElement.innerHTML += `<li>${businessElement.value}</li>`;
};


function clear() {
    businessElement.value = '';
    
}


function focus() {
    businessElement.focus();
}


 listElement.addEventListener ('click', function(e)  {
    if (event.target.style.backgroundColor == 'yellow') event.target.classList.add("green");

    else event.target.classList.toggle("green");
    return false;
}); 