import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from './Firebase';

const SidebarChat = ({ addNewChat, id, name }) => {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setMessages(snapshot.docs.map((doc) => doc.data()))
        ))
    },[])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);
    const createChat = () => {
        const roomName = prompt("please entername for a chat");

        if( roomName ) {
            db.collection('rooms').add(({
                name: roomName,
            }))
        }
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
        ) : (
            <div onClick={createChat}className="sidebarChat">
                <h2>Add new Chat</h2>
            </div>
        
    )
}

export default SidebarChat
