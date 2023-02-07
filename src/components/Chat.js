import React, {useState, useEffect} from "react";
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from "firebase/firestore"
import {auth, db} from "../firebase-config";
import axios from 'axios';

export const Chat = (props) => {
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])

    // setting it to our collection in firestore called "messages"
    const messagesRef = collection(db, "messages")


    // Api Call

    useEffect(() =>{
        axios({
            url: `https://api.giphy.com/v1/gifs/search`,
            params: {
                api_key: `0BOwqWAlsHS20sdLrfJC7llfqPyQfVuJ`,
                q: room,
            }
        }).then((res) =>{
            console.log(res.data);
        })
    })


        useEffect(() =>{
            const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
            const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
                let messages = [];
                // loop through each message
                snapshot.forEach((doc) => {
                    // push an object that contains prev data with an id
                    messages.push({...doc.data(), id: doc.id});
                });
                setMessages(messages);
            })

            // cleaning up useEffect?
            return() => unsubscribe();
        }, []);

    // function that handles when send button is pressed
    const handleSubmit = async (e) =>{
        e.preventDefault();
        // If message is empty stop function & dont send message
        if(newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            // same name don't have to do room: room
            room,
        });
    };
    return <div className="chat-app"> 
                <div className="header"><h1>Welcome to: {room.toUpperCase()}</h1></div>
                <div className="messages">
                    {messages.map((message) => 
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}</span>  <p>{message.text}</p>
                    </div>)}
                </div>
                <form onSubmit={handleSubmit} className="new-message-form">
                    <input placeholder="Type your message here..." className="new-message-input" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />    
                    <button type="submit" className="send-button">Send</button>
                </form> 
            </div>
}

export default Chat;