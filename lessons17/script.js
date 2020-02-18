'use strict';

let addInfoElement = document.getElementById('addInfo');
let stickerElement = document.getElementById('sticker');
let boardElement = document.getElementById('board');
let stickerTemplateElement = document.getElementById('stickerTemplate');
let deleteElement = document.getElementsByClassName('delete-btn');
const LOCALSTORAGE_KEY = 'notes';
const taskItemTemplate = document.getElementById('taskItemTemplate').innerHTML;
const DELETE_BTN_CLASS = 'delete-btn';
const EDIT_CLASS = 'edit';
let noteList = [];

addInfoElement.addEventListener('click', onBtnClick);

function onBtnClick() {
    this.classList.add('loading');

    setTimeout(() => {
        this.classList.remove('loading');
    }, 1000);
}

addInfoElement.addEventListener('click', addToBoard);

function addToBoard(e) {
    e.preventDefault();
    createSticker();
    renderNote();
}



boardElement.addEventListener('click', onListClick);
boardElement.addEventListener('focusout', onboardElementFocusout);

function onListClick(e){
    switch(true) {
        case e.target.classList.contains(DELETE_BTN_CLASS):
            deleteSticker(e.target.parentElement.dataset.id);
            break;
    }
}

function deleteSticker(id){
    noteList = noteList.filter(el => el.id !=id);
    save();
    deleteNoteElement(id);
}

function deleteNoteElement(id) {
    const element = getNoteElement(id);
    element.remove();
}

function getNoteElement(id) {
    return boardElement.querySelector(`[data-id="${id}"]`)
}



function createSticker() {
    const sticker = {
        id: Date.now(),
        business: ''
    };

    noteList.push(sticker);

    save();
    
}

function save () {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(noteList));
}

function restore () {
    noteList = localStorage.getItem(LOCALSTORAGE_KEY);
    noteList = noteList ? JSON.parse(noteList) : [];
}



function onboardElementFocusout(e){
    const element = e.target;
    
    switch(true) {
        case e.target.classList.contains(EDIT_CLASS):
            updateNote (
                element.parentElement.dataset.id,
                element.name,
                element.value
            );
            break
}
}

function updateNote (id,name,value) {
    const stickerNote = noteList.find(el => el.id == id);

    stickerNote(name) = value;
    save();
    
}

function renderList() {
    noteList.forEach(renderNote);
}

function renderNote(sticker){
    boardElement.insertAdjacentHTML('beforeend',getNote(sticker));
}


function getNote(sticker) {
    return taskItemTemplate
        .replace('{{id}}', Date.now())
        .replace('{{titleClass}}', 'sticker')
        .replace('((business))', '');

}
