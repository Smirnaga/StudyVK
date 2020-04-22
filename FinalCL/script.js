'use strict';

let $countFormElement = $('#countForm');
let $listOfContactsElement = $('#listOfContacts');
let $addInfoElement = $('#addInfo');
const $inputs = $('.text');
const LOCALSTORAGE_KEY = 'contact';
const $contactForm = $('#contactForm');
const taskItemTemplate = $('#taskItemTemplate').html();
const DELETE_BTN_CLASS = 'delete-btn';
const CONTACT_ROW_CLASS = 'contact-row';
const $reminder= $('.message');
let contactList = [];
let listDateBirth = [];
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
    height: 450,
    width: 550,
    modal: true,
    buttons: {
        Save: function() {
            addContact();
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

init();

$('#date').datepicker({
    defaultDate: "-25y",
    yearRange: '1973:2020',
    changeMonth: true,
    changeYear: true
  });

 $contactForm.on('submit', e => {
    e.preventDefault(); 
    saveContact();
}); 

$addInfoElement.on('click', () => openModal(getEmptyContact()));
$listOfContactsElement.on('click', '.edit-btn', onEditBtnClick);
$listOfContactsElement.on('click', '.delete-btn', onDeleteBtnClick); 

function onDeleteBtnClick() {
    const $contact = $(this).closest('.contact-row');
    const contactId = $contact.data('id');

    deleteContactElement(contactId);

    deleteContact(contactId);
}

function deleteContactElement(id) {
    const $contact = $(`.contact[data-id="${id}"]`);
    $contact &&  $contact.remove();
}

function deleteContact(id) {
    contactList = contactList.filter(contact => contact.id !== id);
    saveContact();
    $('.contact-row').html('');
    renderContact();
    
}

function init() {
    restoreContacts();
    renderContact();
}

function restoreContacts() {
    contactList = getContacts();
}

function renderContact() {
    contactList.forEach(render);
}



function addContact() {
    const contact = {};

    $contactForm.serializeArray().forEach(v => (contact[v.name] = v.value));
    contact.id = Date.now();
    contactList.push(contact);
    saveContact();
    render(contact);
    $dialog.dialog('close');
}


function render(contact) {
    const $contact = $(  taskItemTemplate
    .replace('{{id}}', contact.id)
    .replace('{{name}}', contact.name)
    .replace('{{surname}}', contact.surname)
    .replace('{{email}}', contact.email)
    .replace('{{phone}}', contact.phone)
    .replace('{{date}}', contact.date)
    )
    $listOfContactsElement.append($contact);
}

function editContact(id) {
    openModal(getContact(id));
    updateContact();
}

function updateContact(id, changes) {
    contactList = contactList.map(contact =>
        contact.id != id ? contact : { ...contact, ...changes }
    );
    
    saveContact();
} 

function onEditBtnClick(e) {
    const id = getContactId(e.target);
    editContact(id);
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
    return contactList.find(item => item.id == id);
}






function getEmptyContact() {
    return { ...EMPTY_CONTACT };
}

function openModal(contact) {
    fillForm(contact);
    $dialog.dialog('open');
}

function fillForm(contactList) {
    $inputs.each((i, el) => {
        el.value = contactList[el.name];
    });
}

function resetForm() {
    $inputs.val('');
}

function saveContact() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contactList));
}

function getContacts () {
    contactList = localStorage.getItem(LOCALSTORAGE_KEY);
    return  contactList ? JSON.parse(contactList) : [];
}

$(document).ready(function(){
    $("#search").on("keyup", function() {
      var  value = $(this).val().toLowerCase();
      $("#listOfContacts tr").filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
