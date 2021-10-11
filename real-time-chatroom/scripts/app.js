// dom queries
const chatList = document.querySelector('.chat-list'); //chat list
const newChatForm = document.querySelector('.new-chat'); // upload a new chat
const newNameForm = document.querySelector('.new-name'); // update username
const updateMssg = document.querySelector('.update-mssg'); // mssg for updating name
const rooms = document.querySelector('.chat-rooms'); // update the room

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    // get the message value from input
    const message = newChatForm.message.value.trim();
    // add messages
    chatroom.addChat(message)
        .then(() => newChatForm.reset()) // after sending the message, clear the input from
        .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset the form
    newNameForm.reset();
    // show then hide the update mssg
    updateMssg.innerText = `Your name was updated to ${newName}.`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }

});

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';


// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats & render
chatroom.getChats(data => chatUI.render(data));