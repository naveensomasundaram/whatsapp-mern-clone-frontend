import React, {useState, useEffect} from 'react'
import '../../styles/SidebarChats.css';
import { Avatar } from '@material-ui/core';
import { Link } from "react-router-dom";
import axios from '../../axios';

function SidebarChat({addNewChat, id, name, displayName}) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])
 
    const createChat = async () => {
        const roomName = prompt("Please enter a name for Chat room");

        if(roomName) {
            await axios.post("/rooms/new", {
                "name":roomName,
                "createdBy": displayName,
                "timestamp": new Date(),
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebar__chat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarchat__info"> 
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        ) : (
            <div className="sidebar__chat" onClick={() => createChat()}>
                <h2>Add new Chat</h2>
            </div>    
        );
}

export default SidebarChat