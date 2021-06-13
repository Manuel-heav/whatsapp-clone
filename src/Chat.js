import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect} from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom'
import './Chat.css'
import SelectInput from '@material-ui/core/Select/SelectInput';
import db from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

const Chat = () => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [message, setMessage] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot =>{
                setRoomName(snapshot.data().name)
            })
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
        };
    console.log(message);

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                 <p>Last seen at {new Date(
                     messages[messages.length -1]?.timestamp?.toDate()
                 ).toUTCString()}</p>
            </div>

            <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
            </div>
            </div>

            <div className="chat__body">
            {messages.map(message => (
                 <p className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                 <span className="chat__name">{message.name}</span>
                        {message.message} 
                     <span className="chat__timestamp">

                         {new Date(message.timestamp?.toDate()).toUTCString()}
                     </span>
                 </p>
            ))}
               
                
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                    <form>
                        <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}/>
                        <button type="submit" onClick={sendMessage}>Send a message</button>
                    </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
