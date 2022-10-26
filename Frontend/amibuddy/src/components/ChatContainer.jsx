import React,{useState,useRef} from "react";
import styles from './ChatContainer.module.css';
import { getDisplayPicture} from "../ServerRoutes";
import axios from 'axios';
import { sendMessageRoute,getMessageRoute,host,updateRecentChat} from '../ServerRoutes';
import { useEffect } from "react";
import Messages from "./Messages";

export default function ChatContainer({trigger,user,selectedUser,recentChat,setRecentChat,socket}){

    const [newMessage,setNewMessage] = useState("");
    const [msg,setMsg] = useState("");
    const scrollRef = useRef();
    const [messages,setMessages] = useState(undefined);
    const [texted,setTexted] = useState(false);
    const handleMsgChange = (e)=>{
        setMsg(e.target.value);
    }

    

    const handleSendMessage =async (msg)=>{
       await axios.post(sendMessageRoute,{
        from:user._id,
        to:selectedUser._id,
        message:msg
       });
       const newRecentChat = await axios.post(updateRecentChat,{
        from:user._id,
        to:selectedUser._id,
       });
       setRecentChat(newRecentChat.data.newRecentChat)
       socket.current.emit("updateRecentChatSocket",{
        to:selectedUser._id,
       });
       socket.current.emit("sendMessage",{
        to:selectedUser._id,
        from:user._id,
        message:msg
       });
       const msgs = [...messages];
       msgs.push({yourMessage:true,message:msg});
       setMessages(msgs);
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msgReceive",(data)=>{
                if(data.data.from === selectedUser._id)
                setNewMessage({yourMessage:false,message:data.data.message,userFrom:data.data.from});
                setTexted(true);
            });
      
        }
    },[trigger]);


    useEffect(()=>{
         if(newMessage && newMessage.userFrom === selectedUser._id) {
            setMessages((prev)=>[...prev,newMessage]);
         }
    },[newMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages]);

    const sendMessage = ()=>{
        if(msg.length > 0){
            handleSendMessage(msg);
            setTexted(true);
            setMsg("");
        }
    }


    return <div className={styles.ChatArea}>
       {/* {(user&&!selectedUser)? <div className={styles.welcomeText}>
            <h1>Welcome {user["firstName"]} {user["lastName"]} !</h1>
            <h1>You Have X Unread Messages !</h1>
        </div>:""} */}
        {user && selectedUser && <div className={styles.container}>
            
            <div className={styles.header}>
            <img className={styles.userImage}  src={`${getDisplayPicture}/${selectedUser["image"]}`} alt="User Image" />
            <div>
                <h1>{selectedUser["firstName"]} {selectedUser["lastName"]}</h1>
                <h2>{selectedUser["course"]}</h2>
            </div>
            </div>
            <div className={styles.messageHolder} >
<Messages texted={texted} setTexted={setTexted} user={user} scrollRef={scrollRef} selectedUser={selectedUser} setMessages={setMessages} messages={messages}/>
            </div>
            
                <div className={styles.sendMessageHolder}>
                <textarea value={msg} placeholder="Type Your Message  .  .  .  .  .  .  .  .  .  ." onChange={handleMsgChange} type="text" />
                <img onClick={sendMessage} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAC/ElEQVR4nO2azWrUUBiG3zNm/qQqtbfgT9GFuhGxIJTahQs3ruoFWPAGBBFRilv3ikuXbt20glKwto43YKk3oMjMMAo1jM1xMQTa8J3knOScky9jnl2TSTjfm+fNTDMD1NTU1PzHCNUO+eXCFUCuTv6Qr8XVr5+8rcojZACyd/EycLANoHNo8zsAT6ctiAa9+e89HB0eAJYBbMne/IbszV93vC5vKAJoKKuBKQuCDkBE6xrHxkF8lDvnF62uyiP0PWDvTBuD4DuAUwbn2kIkH4trux/sLM0PpAHi7LcQwFvDcy2gId5XzQjFPQCAkG9ynrNSQag/B+SrAQXraigNyFkDCtZGqCsAFKkBBcsg0t7vbdaAgkU1Ug2wWAMKFkakVwCwXQOKUoNIrQDgvAYUXquRaYDjGlB4NSK7AoCPGlB4CSKzAkApNaBwUg0tA0qoAYUTI/QqAJRVAwqrQWhVAGBTA4pC1dA2gEkNKAoZoV8BgFMNKHIFoV0BgHUNKLSqYWQA4xpQxEZsTB7z05hVAOBeA4pl4GBbfj53idppHsDvcB3AqOiqPNOBEKvUjsD8XMMOfoxOQEZFF+WX9swNarO5AWP5ADIyunmWjwCOtdaoPeYBROO7hdfjk6Dbx8zsiljqk/cus7fBndMn8XM4rIQBzfYIQXdN3Bw+T3uZ2T3gl3zIfvgjg4eZLzcLIApX8q7LOYaDx+j/M8RVf03VVegbwE3/nFc8iX4AXPS3NHiM3iMxDvoXVF2FngFl6m/5iifRC6AM/R0PHpP9xYhv/R2priLbAF/6e7riSbIDcK1/SYPHpH897lJ/z6qrSDfAhf4lX/Ek6QHY1J/Z4DHqH0nZ0p+J6irUBhTVn+kVT6IOIK/+FRk8hv6pbB79mauugjbARP+KXfEkdADR+Hb2kd0+Wp1HYmnwooqDx9ABCEj1EYcH33e1Lm/Qj8WbrWcQiQYE3T6Oz94Xt/bnJsNPB+rPAZtzd/AnfAIhxmgGr8Ti4KXPhdXU1NTUeOAfxSqpeKuzpYYAAAAASUVORK5CYII="></img>
                </div>
            
            
            
            
            </div>}
    </div>

}