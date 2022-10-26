import React,{useState} from "react";
import styles from './SideBar.module.css';
import { allStudentsRoute, getDisplayPicture,allFacultiesRoute,allSeniorsRoute,getRecentChat } from "../ServerRoutes";
import settingsGif from "../svg/settings.gif"
import { useEffect } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
export default function SideBar({setUpdateRecents,socket,trigger,setTrigger,setSelectedUser,allStudents,allFaculties,allSeniors,user,setIsFindUser,setUserType,recentChat,setRecentChat}){

    
    const [recents,setRecents] = useState(undefined);
    const handleSelectedUser=(person)=>{
        setTrigger(!trigger);
        setSelectedUser(person);
        setIsFindUser(false);
        }

    const setStudents = ()=>{
        setIsFindUser(true);
        setUserType("students");
    }
    const setFaculties = ()=>{
        setIsFindUser(true);
        setUserType("faculties");
    }
    const setSeniors = ()=>{
        setIsFindUser(true);
        setUserType("seniors");
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("getRecentChatSocket",(data)=>{
                setUpdateRecents((prev)=>prev+data);
            });
      
        }
    },[trigger]);

    


    useEffect(()=>{
        async function getRecentChats(){
            if(user){
                const newRecentChat = await axios.post(getRecentChat,{
                    from:user._id,
                   });
                   setRecentChat(newRecentChat.data.newRecentChat[0]);
                }
        }
        getRecentChats();
  
    },[user]);

    
    useEffect(()=>{
        let arr = [];
        if(recentChat){
        for(let i=0;i<recentChat.users.length;i++){
            for(let j=0;j<allStudents.length;j++){
                if(recentChat.users[i] === allStudents[j]._id){
                    arr.push(allStudents[j])
                    
                }
            }
            for(let j=0;j<allFaculties.length;j++){
                if(recentChat.users[i] === allFaculties[j]._id){
                    arr.push(allFaculties[j])
                    
                }
            }
        }
    }
        setRecents(arr);
    },[recentChat,allStudents,allFaculties]);

    return <div className={styles.SideBar}>

    <div className={styles.header}>
    {user ? <img className={styles.userImage}  src={`${getDisplayPicture}/${user["image"]}`} alt="User Image" /> : ""}
    <div className={styles.textHolder}>
    {user ? <h1>{`${user["firstName"]} ${user["lastName"]}`}</h1> : ""}
    {user ? user["aud"]?<h2>{`Aud : ${user["aud"]}`}</h2>:<h2>{`Fid : ${user["fid"]}`}</h2> : ""}
    </div>
    <img className={styles.settingstr} src={settingsGif} alt="" />
    <img className={styles.settingstl} src={settingsGif} alt="" />
    <img className={styles.settingsbl} src={settingsGif} alt="" />
    <img className={styles.settingsbr} src={settingsGif} alt="" />
    </div>
    <div className={styles.container}>
    <div className={styles.findUsersButton}>
    <button onClick={setFaculties}>Faculty</button>
  <button onClick={setStudents}>Students</button>
  <button onClick={setSeniors}>Seniors</button>
    </div>
    <div className={styles.recentChat}>
    <h1>Recent Chat</h1>
    {recents && recents.map((person,i)=>{
       return <div key={uuidv4()} className={styles.recentChatBox} onClick={()=>{handleSelectedUser(person)}}> 
       <img className={styles.userImage}  src={`${getDisplayPicture}/${person["image"]}`} alt="User Image" />
       <div className={styles.name}>
       <h1>{person.firstName} {person.lastName}</h1>
       </div>
       </div>
    })}
    </div>

    </div>
    </div>

}