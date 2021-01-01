import React, { useState, useEffect } from 'react'
import '../../styles/Chat.css';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useParams } from  'react-router-dom';
import {useStateValue} from '../../StateProvider';
import axios from '../../axios';

function Chat() {

    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    const sendMessage = async (input) => {        
        await axios.post("/message/new", {
            "roomId": roomId,
            "message": input,
            "name":user.displayName, 
            "timestamp": new Date(),
            "received": false
        });
    }

    useEffect(() => {
        if(roomId) {
            axios.post("/rooms/roomId", {
                "roomId": roomId,
            }).then(response => {
                setRoomName(response.data.name)
            });

            axios.post("/message/getMessageByRoomId", {
                "roomId": roomId,
            }).then(response => {
                setMessages(response.data);
            });
        }
    }, [roomId]);

    // pusher code..
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher('afffa0c8d4e515389269', {cluster: 'us3'});
    
        // channel name: trigger name from server
        // trigger name: event name from server
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessage) => {
            // alert(JSON.stringify(newMessage));
            setMessages([...messages, newMessage]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };

    },[messages]);
    
    return (
        <div className="chat">
            <ChatHeader roomName={roomName} roomId={roomId} messages={messages}/>
            <ChatBody messages={messages} user={user}/>
            <ChatFooter sendMessage={sendMessage}/>
        </div>
    )
}

export default Chat
