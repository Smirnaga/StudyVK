'use strict';
let countFormElement = document.getElementById('countForm');
let listOfContactsElement = document.getElementById('listOfContacts');
let addInfoElement = document.getElementById('addInfo');
let nameElement = document.getElementById('name');
let surnameElement = document.getElementById('surname');
let emailElement = document.getElementById('email');
const taskItemTemplate = document.getElementById('taskItemTemplate').innerHTML;
const DELETE_BTN_CLASS = 'delete-btn';


const CONTACT_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users';

let list = [];

init();

function init (){
    getUsers();
}

function getUsers() {
    return fetch(CONTACT_URL)
    .then(resp => resp.json())
    .then(setUsers)
    .then(renderUsers);
}

function setUsers(data){
    return (list = data);
}


function renderUsers(data) {
    listOfContactsElement.innerHTML = data.map(generateUsersHtml).join('\n') ;
}

function generateUsersHtml(users) {
    return taskItemTemplate
        .replace('{{id}}', users.id)
        .replace('{{name}}', users.name)
        .replace('{{surname}}', users.surname)
        .replace('{{email}}', users.email);
}







addInfoElement.addEventListener('click', onBtnClick);

function onBtnClick() {
    this.classList.add('loading');

    setTimeout(() => {
        this.classList.remove('loading');
    }, 2000);
}

addInfoElement.addEventListener('click', addToTable);

function addToTable(e) {
    e.preventDefault();
    validateForm();
    addRow();
    resetForm();
}


function resetForm() {
    countFormElement.reset();
}


 function validateForm () {
    if ( nameElement.value == "" || surnameElement.value == "" || emailElement.value == "")
    
    {
        document.querySelector('.invalid').innerHTML = `Вы не ввели данные`;
    } else document.querySelector('.invalid').innerHTML = ``;
    return false;
};





countFormElement.addEventListener('focus', onContactFormFocus, true);
countFormElement.addEventListener('blur', onContactFormBlur, true);

function onContactFormBlur(e) {
    if (!validate(e.target.value)) {
        makeInvalid(e.target);
    }
}

function onContactFormFocus(e) {
    makeValid(e.target);
}

function makeInvalid(el) {
    el.classList.add('error');
}

function makeValid(el) {
    el.classList.remove('error');
}

function validate(value) {
    return !!value.trim();
}

listOfContactsElement.addEventListener('click', onListClick);

function onListClick(e){
    switch(true) {
        case e.target.classList.contains(DELETE_BTN_CLASS):
            deleteUsers(e.target.parentNode.dataset.id);
            break;
    }
}

function deleteUsers(id){
    const users = list.find(users => users.id === users.id);
    fetch(`${CONTACT_URL}/${users.id}`, {
        method: 'DELETE'
    });

    list = list.filter(users => users.id !== id);

    renderUsers(list);
}

function addRow() {
    const users = { name: nameElement.value, surname: surnameElement.value, email: emailElement.value };

    fetch(CONTACT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    })
        .then(resp => resp.json())
        .then(addUser);
}

function addUser(users) {
    list.push(users);

    renderUsers(list);
}