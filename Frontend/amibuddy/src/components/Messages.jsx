import React,{useState} from "react";
import styles from './Messages.module.css';
import axios from 'axios';
import { sendMessageRoute,getMessageRoute} from '../ServerRoutes';
import { useEffect } from "react";


export default function Messages({scrollRef,user,selectedUser,setMessages,messages,texted,setTexted}){

    
    useEffect(()=>{

        async function getAllMessages(){
            const data = await axios.post(getMessageRoute,{
                from:user._id,
                to:selectedUser._id
            });
            setMessages(data.data);
            if(data.data.length > 0){
                setTexted(true);
            }else{
                setTexted(false);
            }
        }
        getAllMessages();
    },[selectedUser,user]);

    

    return <div className={styles.messagesHolder} >
        {texted?messages.map((msg,i)=>{
            
            if(msg.yourMessage){
                return <div key={i} ref={scrollRef} className={styles.messageContainerLeft}><h1 className={styles.yourMessage}>{msg.message}</h1></div>
            }else{
                return <div key={i} ref={scrollRef} className={styles.messageContainerRight}><h2 className={styles.theirMessage}>{msg.message}</h2></div>
            }
        }):<div className={styles.textFirst}><h3 >Send A Message To Start Texting</h3></div>}
    </div>
}