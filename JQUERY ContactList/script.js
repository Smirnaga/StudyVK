'use strict';
let $countFormElement = $('#countForm');
let $listOfContactsElement = $('#listOfContacts');
let $addInfoElement = $('#addInfo');
const $inputs = $('.text');
const $contactForm = $('#contactForm');
const taskItemTemplate = $('#taskItemTemplate').html();
const DELETE_BTN_CLASS = 'delete-btn';
const CONTACT_ROW_CLASS = 'contact-row';
const EMPTY_CONTACT = {
    id: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    date: ''
};


const $dialog = $('#dialog-form').dialog({
    autoOpen: false,
    height: 100,
    width: 150,
    modal: true,
    buttons: {
        Save: function() {
            createContact();
            $dialog.dialog('close');
            
        },
        Cancel: function() {
            $dialog.dialog('close');
            
        }
    },
    Close: function() {
        resetForm();
    }
});


const CONTACT_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';

let list = [];

$('#date').datepicker();

$contactForm.on('submit', e => {
    e.preventDefault();
    saveContact();
});

$addInfoElement.on('click', () => openModal(getEmptyContact()));
$listOfContactsElement.on('click', '.edit-btn', onEditBtnClick);
$listOfContactsElement.on('click', '.delete-btn', onDeleteBtnClick);

init();

function init() {
    getData()
        .then(setUsers)
        .then(renderUsers);
}

function onEditBtnClick(e) {
    const id = getContactId(e.target);
    editContact(id);
}

function onDeleteBtnClick(e) {
    const id = getContactId(e.target);
    deleteContact(id);
}

function getContactId(el) {
    return $(el)
        .closest('.' + CONTACT_ROW_CLASS)
        .data('id');
}

function getContactElement(id) {
    return $listOfContactsElement.find(`[data-id="${id}"]`);
}

function getContact(id) {
    return list.find(item => item.id == id);
}

function editContact(id) {
    openModal(getContact(id));
}


function getData() {
    return fetch(CONTACT_URL).then(res => res.json());
}

function setUsers(data) {
    return (list = data);
}

function renderUsers(data) {
    const html = data.map(getContactHtml).join('\n');

    $listOfContactsElement.html(html);
}


function getContactHtml(contact) {
    return taskItemTemplate
        .replace('{{id}}', contact.id)
        .replace('{{name}}', contact.name)
        .replace('{{surname}}', contact.surname)
        .replace('{{email}}', contact.email)
        .replace('{{phone}}', contact.phone)
        .replace('{{date}}', formatDate(contact.date));
}

function formatDate(date) {
    date = new Date(date);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getYear();
}


function getEmptyContact() {
    return { ...EMPTY_CONTACT };
}

function openModal(contact) {
    fillForm(contact);
    $dialog.dialog('open');
}

function fillForm(list) {
    $inputs.each((i, el) => {
        el.value = list[el.name];
    });
}

function getContactElement(id) {
    return $listOfContactsElement.find(`[data-id="${id}"]`);
}

function saveContact() {
    const contact = getFormData();

    if (contact.id) {
        updateContact(contact);
    } else {
        createContact(contact);
    }
}

function getFormData() {
    let contact = {};
    $inputs.each((i, el) => {
        contact[el.name] = el.value;
    });

    return contact;
}

function updateContact(contact) {
    fetch(`${CONTACT_URL}/${contact.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });

    list = list.map(item => (item.id == contact.id ? contact : item));
    getContactElement(contact.id).replaceWith(getContactHtml(contact));
}

function createContact(contact) {
    fetch(`${CONTACT_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    })
        .then(res => res.json())
        .then(contact => {
            list = [...list, contact];
            $listOfContactsElement.append(getContactHtml(contact));
        });
}

function deleteContact(id) {
    fetch(`${CONTACT_URL}/${id}`, {
        method: 'DELETE'
    });

    getContactElement(id).remove();
}

function resetForm() {
    $inputs.val('');
}

