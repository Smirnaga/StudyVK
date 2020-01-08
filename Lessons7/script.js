'use strict';
let numElement = document.getElementById("numbers");
let listElement = document.querySelector('#list');


document.getElementById('Generate').addEventListener('click', onGenerateClick);

function onGenerateClick() {
    generate();
    clear();
    focus();
    
}

function getNum() {
    return {
        a: +numElement.value
    };
}

function  generate() {
    listElement.innerHTML = "";
    for (let i = 1; i <= +numElement.value; i++) {
    
        const li = document.createElement('li');
        li.innerHTML = `${i}`;
        listElement.appendChild(li);
      }
}

function clear() {
    numElement.value = '';
    
}

function focus() {
    numElement.focus();
}

