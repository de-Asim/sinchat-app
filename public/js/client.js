
const form = document.getElementById('send-form');
const messageInput = document.getElementById('chatInp')
const messageContainer = document.getElementById('chat-container')
const btn = document.getElementById('submitBtn')


const append =(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('chat');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const scrollDiv =()=>{
    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    
}

const name = prompt("Please enter your name");
if(name){
    const socket = io('https://sinchat-socket.herokuapp.com/');
    // const socket = io('http://localhost:8000');

    socket.emit('new-user-joined', name);
    
    socket.on('user-joined', name=>{
        append(`${name} joined the chat`,'left');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(chatInp.value){
    socket.emit('send',chatInp.value,name)
    append(`You: ${chatInp.value}`,'right')
    chatInp.value ='';
    scrollDiv();
    }
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})

}
else{
    prompt('Please enter your name')
}