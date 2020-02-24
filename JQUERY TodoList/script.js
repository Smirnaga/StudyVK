'use strict';
const LOCALSTORAGE_KEY = 'todos';
let todos = [];

init();

function init() {
    restoreState();
    getTodos();
}

$(document).ready (function() {
    addEventListenerToAddList();
});

function addEventListenerToAddList(){
    $('.AddToList').click(function(event){
        event.preventDefault();

        let $valueTask = $('.business').val();
        if(!$valueTask){
            alert('Вы ничего не ввели')
            return false
        }
        let $containerToDo = '<li>'+ $valueTask +' <span class="delete-btn">X</span></li>' ;
        $('.ToDoList').append($containerToDo);
        $('.business').val('');
    });
}
$('.ToDoList').on('click','li',function(e){
    const $el = $(e.target);
    if($el.hasClass( "" ))

    $el.addClass( "green" );
    else 
    $el.removeClass( "green" )
    return false;
});

function deleteSticker(id){
    noteList = noteList.filter(el => el.id !=id);
    save();
    deleteNoteElement(id);
}

$('.ToDoList').on('click','span',function(e){
    const $el = $(e.target);
    if($el.hasClass( "delete-btn" ))

    $el.closest( "li" ).remove();
    saveState();

})

function getTodos(){
    function getTodos() {
        restoreState();
        renderTodos(todos);
    }
    
function renderTodos(data) {
    $taskList.html(data.map(generateTodoHtml).join('\n'));
}
    
function generateTodoHtml(todo) {
    return taskItemTemplate
    .replace('{{id}}', todo.id)
    .replace('{{title}}', todo.title)
    .replace('{{completeClass}}', todo.isDone ? 'done' : '');
}
}

function saveState() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
}

function restoreState() {
    todos = localStorage.getItem(LOCALSTORAGE_KEY);

    todos = todos ? JSON.parse(todos) : [];
}