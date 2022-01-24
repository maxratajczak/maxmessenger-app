import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import '../css/ChatRoom.css'
import chatIcon from '../g-icon.png'

const ChatRoom = ({firebase, auth, firestore, user, name}) => {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');

    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState("");
    const dummyDiv = useRef();

    useEffect(() => {
        dummyDiv.current.scrollIntoView();
    })
    
    const sendMessage = async(e) => {
        e.preventDefault();
        if(formValue !== "") {
            const { uid, photoURL } = auth.currentUser;

            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                sentBy: user.displayName
            });
            setFormValue("")

            dummyDiv.current.scrollIntoView({ behavior: "smooth" });
        }
        
    }
    
    return (
    <div className='ChatRoom'>
        
        <div className='chat'>
            <div className='topBar'>
                <img className='chatIcon' src={chatIcon} alt="" />
                <h4 className='chatRoomName'>{name}</h4>
            </div>
            <div>
                {messages && messages.map(msg => <ChatMessage auth={auth} user={user} key={msg.id} message={msg}/>)}
            </div>
            <div className='dummyDiv' ref={dummyDiv}></div>
            {user ? 
            <div className='sendMessageForm'>
                <form onSubmit={sendMessage}>
                    <input placeholder='Type a message...' type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                    <button className='sendButton' type='submit'>Send</button>
                </form>
            </div>
            :
            <div className='sendMessageForm'>
                <form onSubmit={sendMessage}>
                    <input placeholder='Log in to send a message' disabled type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                    <button className='sendButton disabled' disabled type='submit'>Send</button>
                </form>
            </div>
            }
        </div>
    </div>
    )
}
 
export default ChatRoom;