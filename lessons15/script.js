'use strict';
let albumsElement = document.getElementById('albums');
let photosElement = document.getElementById('photos');
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId={{albumId}}';
const albumItemTemplate = document.querySelector('#albumItemTemplate')
    .innerHTML;
 const photoTemplate = document.querySelector('#photoTemplate')
    .innerHTML;
 

getAlbum();

function getAlbum() {
    fetch(ALBUMS_URL)
        .then(response => response.json())
        .then(renderAlbum);
}

function renderAlbum(list) {
    list.forEach(createAlbum);
}


function createAlbum(albums) {
    const html = albumItemTemplate
        .replace('{{albumId}}', albums.id)
        .replace('{{title}}', albums.title)
        .replace('{{titleClass}}', 'album');

    albumsElement.innerHTML += html;
}

albumsElement.addEventListener('click', ShowPhotos);

function ShowPhotos (e){
    clear();
    getPhotos(e);
}

function getPhotos(e) {
    const albumId = e.target.dataset.id;
    console.log(albumId);
    fetch(PHOTOS_URL + `?albumId=${albumId}`)
        .then(response => response.json())
        .then(addPhotos);
}

function addPhotos(list) {
    list.forEach(createPhoto);
}

function createPhoto(photoAlbums) {
    const htmlPhoto = photoTemplate
    .replace('{{photoClass}}', `photoAlbum`)
    .replace('{{imgLink}}', photoAlbums.thumbnailUrl);

albumsElement.innerHTML += htmlPhoto;
}

function clear() {
    photosElement.innerHTML = '';
}