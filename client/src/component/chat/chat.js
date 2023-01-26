import React, { useEffect, useState } from 'react'
import { user } from "../join/join";
import socketIo from "socket.io-client";
import "./chat.css";
import sendLogo from "../../images/send.png";
import Message from "../message/message";
import closeIcon from "../../images/closeIcon.png";

let socket;

const ENDPOINT = "https://chat-backend-uzqx.onrender.com/";

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id })
        document.getElementById('chatInput').value = "";
    }

    // console.log(messages);
    

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setid(socket.id);
        });

        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
        })

        return () => {
            // socket.emit('disconnect');
            socket.off();
        }

    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        })
        return () => {
            socket.off();
        }
    }, [messages])



    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>C CHAT</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>
                

                <div className='chatBox'>
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </div>
                
                <div className="inputBox">
                    <input type="text" id="chatInput" />
                    <button onClick={(send)} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>

        </div>
    )
}

export default Chat
