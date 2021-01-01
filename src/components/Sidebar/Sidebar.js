import React, {useState,useEffect} from 'react'
import '../../styles/Sidebar.css';
import SidebarHeader from './SidebarHeader';
import SidebarSearch from './SidebarSearch';
import SidebarChat from './SidebarChat';
import {useStateValue} from '../../StateProvider';
import Pusher  from 'pusher-js';
import axios from "../../axios";

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        axios.get('/rooms/sync').then(response => {
            const data = response.data;
            let roomArray = [];            
            data.map(room => (
                roomArray.push({
                    id: room._id , 
                    data:  {
                        name: room.name,
                        createdBy: room.createdBy,
                        timestamp: room.timestamp
                    }
                })
            ))
            setRooms(roomArray);
        })
    }, []);

    // pusher code..
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher('afffa0c8d4e515389269', {cluster: 'us3'});
    
        // channel name: trigger name from server
        // trigger name: event name from server
        const channel = pusher.subscribe('rooms');
        channel.bind('inserted', (newRooms) => {
            // alert(JSON.stringify(newMessage));
            setRooms([...rooms, newRooms]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };

    },[rooms]);

    return (
        <div className="sidebar">
            <SidebarHeader photoURL={user.photoURL} displayName={user.displayName}/>
            <SidebarSearch/>
            <div className="sidebar__chats">
                <SidebarChat addNewChat displayName={user.displayName}/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
