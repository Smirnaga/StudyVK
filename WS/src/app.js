import './reset.css';
import './styles.css';




const nameInput = document.querySelector('.name');
const messageInput = document.querySelector('.message');
const messageForm = document.querySelector('.publish');
const messagesСhat = document.querySelector('.chat'); 
const messageTemplate = document.querySelector('#messageTemplate').innerHTML;

messageForm.addEventListener('submit', onMessageFormSubmit);

document.querySelector('.clearButton').addEventListener('click', onMessageclear);

function onMessageclear() {
    messagesСhat.innerHTML = '';
}

const socket = new WebSocket(' wss://fep-app.herokuapp.com/ ');
socket.onmessage = onSocketMessage;


function onMessageFormSubmit(e) {
    e.preventDefault();

    if(nameInput.value !== '') {
        socket.send(JSON.stringify({
            action: 'message',
            payload: {
                author: nameInput.value,
                message: messageInput.value,

            }
        }));
        clearMessage();
    }
};

function clearMessage() {
    messageInput.value = '';
}

function onSocketMessage(message) {
        const packetData = JSON.parse(message.data);
        setData(packetData);
        renderMessage(packetData);
};

function setData(packetData) {
    console.log(messages);
}

function renderMessage(packetData) {
    const div = document.createElement('div');

    if(packetData.payload.author !== nameInput.value) {
        div.classList.add('message', 'notYour');
    } else {
        div.classList.add('message');
    };
    
    div.innerHTML = createMessageHTML(packetData);

    messagesСhat.prepend(div)
}

function createMessageHTML(packetData) {
    return messageTemplate
                .replace('{{logo}}', packetData.payload.author[0])
                .replace('{{name}}', packetData.payload.author)
                .replace('{{text}}', packetData.payload.message)
                
}

