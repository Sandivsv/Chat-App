import React, { useEffect, useState } from 'react'
import { user } from "../join/join";
import "./chat.css";
import sendLogo from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png";


const ENDPOINT = "http://localhost:4500/";



const chat = () => {



  return (
    <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>C CHAT</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>
              
                <div className="inputBox">
                    <input  type="text" id="chatInput" />
                    <button  className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>

        </div>
  )
}

export default chat