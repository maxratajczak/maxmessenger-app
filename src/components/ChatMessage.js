import { useState } from 'react';
import '../css/ChatMessage.css'

const ChatMessage = (props) => {

    const { text, uid, photoURL, sentBy, createdAt } = props.message;

    var messageClass = "recieved";
    var name = sentBy.split(" ").shift();

    if(props.user) {
        if(uid === props.auth.currentUser.uid) messageClass = "sent";
    }

    var date = " ";
    if(createdAt) {
      var date = createdAt.toDate().toLocaleString('en-US', {
        hour: 'numeric',
        minute: "numeric",
        hour12: true
      })
    }

    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="" />
        <div className='messageContent'>
          <div className='info'><span className='userName'>{name}</span><span className='dateSent'>{date}</span></div>
          <p>{text}</p>
        </div>
        
      </div>
    )
}
 
export default ChatMessage;