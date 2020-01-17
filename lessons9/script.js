'use strict';
let countFormElement = document.getElementById('countForm');
let listOfContactsElement = document.getElementById('listOfContacts');
let addInfoElement = document.getElementById('addInfo');
let nameElement = document.getElementById('name');
let surnameElement = document.getElementById('surname');
let phoneNumberElement = document.getElementById('phoneNumber');
let deleteBtnElement = document.querySelectorAll('span');


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
    addRow();
    resetForm();
}

function addRow()
{
    let tbody = listOfContactsElement.getElementsByTagName('TBODY')[0];

    
    let row = document.createElement("TR");
    tbody.appendChild(row);

 
    let td1 = document.createElement("TD");
    let td2 = document.createElement("TD");
    let td3 = document.createElement("TD");
    let td4 = document.createElement("TD");

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    
    td1.innerHTML = `${nameElement.value}`;
    td2.innerHTML = `${surnameElement.value}`;
    td3.innerHTML = `${phoneNumberElement.value}`;
    td4.innerHTML = `<span >Delete</span>`;

    Array.from(document.querySelectorAll('span')).forEach(function(e) {
    e.addEventListener('click', function() {
      let tr = this.closest('tr');
      tr.parentElement.removeChild(tr);
    });
  });

}


function resetForm() {
    countFormElement.reset();
}


