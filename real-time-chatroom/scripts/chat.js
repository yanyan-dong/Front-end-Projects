// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

// adding new chat documents
// - create the class
// - making an instance for the class 
// - use the addChat method and input the message
class Chatroom {
    // constructor method will set up the initial properties on the chatroom instance
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        // format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    // set up a real time listener
    // this is not an aysnc method
    getChats(callback){
        // this.unsub created a function
        this.unsub = this.chats // = db.collection('chats');
            .where('room', '==', this.room) // to get documents from a certain collection, 3 arguments needed
            .orderBy('created_at') // want to order the documents, 1 argument needed
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        // update the ui, but we want a seperate class for managing the ui, instead of using chatroom class
                        callback(change.doc.data());
                    }
                });
            });
    }
    updateName(username){
        this.username = username;
        console.log('name updated');
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){ // check if this.unsub has value
            this.unsub(); // unsubscribe from changes
        }
    }
}

// making an instance for the class 
// const chatroom = new Chatroom('general', 'shaun');
// console.log(chatroom);

// // use a addChat method and input the message
// chatroom.addChat('hello everyone')
//     .then(() => console.log('chat added'))
//     .catch(err => console.log(err));

// chatroom.getChats((data) => {
//     console.log(data);
// }) 

// setTimeout(() => {
//     chatroom.updateRoom('gaming');
//     chatroom.updateName('yoshi');
//     chatroom.getChats((data) => {
//         console.log(data);
//     });
//     chatroom.addChat('hello');
// }, 3000);