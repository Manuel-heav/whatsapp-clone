import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect} from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic';

import './Chat.css'

const Chat = () => {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000))
    }, [])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

            <div className="chat__headerInfo">
                <h3>Room name</h3>
                 <p>Last seen at...</p>
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
            
                <p className={`chat__message ${true && 'chat__reciever'}`}>
                <span className="chat__name">Manuel Heav</span>
                    Hello! How are you guys?

                    <span className="chat__timestamp">11:55pm</span>
                </p>
                
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                    <form>
                        <input type="text" placeholder="Type a message"/>
                        <button>Send a message</button>
                    </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
