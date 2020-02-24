

let $addInfoElement = $('#addInfo');
let $stickerElement = $('#sticker');
let $boardElement = $('#board');
let stickerTemplateElement = $('#stickerTemplate');
let $deleteElement = $('.delete-btn');
const LOCALSTORAGE_KEY = 'notes';
const taskItemTemplate = $('#taskItemTemplate').html();
const DELETE_BTN_CLASS = 'delete-btn';
const EDIT_CLASS = 'edit';
let noteList = [];

init();

function init () {
    initDialog();
    restore ();
    renderList();

}

$('#addInfo').on('click', onBtnClick);

function onBtnClick() {
    this.classList.add('loading');

    setTimeout(() => {
        this.classList.remove('loading');
    }, 1000);
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
        height: 200,
        width: 250,
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


 $boardElement.on('click', onListClick); 
$boardElement.on('focusout', onboardElementFocusout);

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
    return $(`[data-id="${id}"]`)
} 



function createSticker() {
    const sticker = {
        id: Date.now(),
        business: ''
    };
    
    noteList.push(sticker);

    save();
    insertStickers();

    
}

function save () {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(noteList));
}

function restore () {
    noteList = localStorage.getItem(LOCALSTORAGE_KEY);
    noteList = noteList ? JSON.parse(noteList) : [];
}



function onboardElementFocusout(e){
    const element = $(e.target);
    
    switch(true) {
        case $(e.target).classList.contains(EDIT_CLASS):
            updateNote (
                element.parentElement.data('id'),
                element.name,
                element.value
            );
            break
}
}

function updateNote (id,name,value) {
    const stickerNote = noteList.find(el => el.id == id);

    $addInfoElement.serializeArray().forEach(({ name, value }) => {
        stickerNote[name] = value;
    });

    save();

}

function renderList() {
    noteList.forEach(insertStickers);
}

function insertStickers (sticker){
    $('.board').append(getNote(sticker));
}

function getNote(sticker) {
    return taskItemTemplate
        .replace('{{id}}', Date.now())
        .replace('{{titleClass}}', 'sticker')
        .replace('{{business}}', $('textarea').val());

}

$( function() {
    $( ".sticker" ).draggable({ handle: "h4" });
    $( "div, h4" ).disableSelection();
  } );
