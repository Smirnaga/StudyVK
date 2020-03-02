'use strict';
let $countFormElement = $('#countForm');
let $listOfContactsElement = $('#listOfContacts');
let $addInfoElement = $('#addInfo');
let $nameElement = $('#name');
let $surnameElement = $('#surname');
let $emailElement = $('#email');
const taskItemTemplate = $('#taskItemTemplate').html();
const DELETE_BTN_CLASS = 'delete-btn';


const CONTACT_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';

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

function setUsers(list){
    return list ;
}


function renderUsers(list) {
    list = $.map(list,generateUsersHtml).join('\n') ;
    $listOfContactsElement.append(list);
    
}

function generateUsersHtml(list) {
  return taskItemTemplate
        .replace('{{id}}', list.id)
        .replace('{{name}}', list.name)
        .replace('{{surname}}', list.surname)
        .replace('{{email}}', list.email)
        .replace('{{phone}}', list.phone)
        .replace('{{date}}', list.date);
    
    
}

$addInfoElement.on('click', addToBoard);

function addToBoard(e) {
    e.preventDefault();
    console.log('clicked');
    dialog.dialog('open');
}

function initDialog() {
    dialog = $('#dialog-form').dialog({
        autoOpen: false,
        height: 100,
        width: 150,
        modal: true,
        buttons: {
            Create: function() {
                createSticker();
                dialog.dialog('close');
                $('.edit').val('');
            },
            Cancel: function() {
                dialog.dialog('close');
                $('.edit').val('');
            }
        },
        close: function() {
            $('.edit').val('');
        }
    });
}




/* $addInfoElement.on('click', onBtnClick);

function onBtnClick() {
    this.classList.add('loading');

    setTimeout(() => {
        this.classList.remove('loading');
    }, 2000);
}

$addInfoElement.on('click', addToTable);

function addToTable(e) {
    e.preventDefault();
    addRow();
    resetForm();
}


function resetForm() {
    countFormElement.reset();
}

function validate(value) {
    return !!value.trim();
}

$listOfContactsElement.on('click', onListClick);

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
} */

/* unction addRow() {
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
}  */