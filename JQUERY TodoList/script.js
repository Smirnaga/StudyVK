'use strict';
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

$('.ToDoList').on('click','span',function(e){
    const $el = $(e.target);
    if($el.hasClass( "delete-btn" ))

    $el.closest( "li" ).remove();
    
})