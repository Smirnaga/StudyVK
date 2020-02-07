'use strict';
let businessElement = document.getElementById('business');
let albumsElement = document.getElementById('ToDoalbums');
let photosElement = document.getElementById('ToDophotos');
let AddToListElement = document.getElementById('AddToList');
const TODOS_ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const TODOS_PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=5';


getTodos();

function getTodos() {
    fetch(TODOS_ALBUMS_URL)
        .then(response => response.json())
        .then(renderTodos);
}

function renderTodos(list) {
    list.forEach(AddLi);
}


function AddLi(task ) {
    albumsElement.innerHTML += `<li>${task.id}  ${task.title}</li>`;
};

albumsElement.addEventListener('click', ShowPhotos);

function ShowPhotos (e){
    clear();
    getPhotos();
    AddLiPhotos();
   
}

function AddLiPhotos(list) {

    photosElement.innerHTML += `<li>${list.thumbnailUrl}</li>`;
}

function getPhotos() {
    fetch(TODOS_PHOTOS_URL)
        .then(response => response.json())
        .then(renderTodos1);
}

function renderTodos1(list) {
    list.forEach(AddLiPhotos);
}

function clear() {
    photosElement.innerHTML = '';
}
