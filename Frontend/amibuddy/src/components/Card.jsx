import React,{useState,useEffect} from "react";
import styles from './Card.module.css';
import {getDisplayPicture} from "../ServerRoutes";
import defaultUserImage from "../utils/userImage.jpg";
import DisplayUserProfile from "./DisplayUserProfile";

export default function Card({trigger,setTrigger,users,search,setSelectedUser,selectedUser,setIsFindUser}){

    const[searchUsers,setSearchUsers] = useState([...users]);
    const[clickedUser,setClickedUser] = useState(undefined);
    const[openProfile,setOpenProfile] = useState(false);
    useEffect(()=>{
        let newStudents = [];
        for(let i=0;i<users.length;i++){
            if(`${users[i]["firstName"]} ${users[i]["lastName"]}`.toLowerCase().includes(search.toLowerCase())){
                newStudents.push(users[i])
            }
        }
        setSearchUsers(newStudents);
    },[search])


    const handleDisplayUserProfile = (user)=>{
        setClickedUser(user);
        setOpenProfile(true);
    }

return <div className={styles.cardArea}>
    {searchUsers.map(user =>
        <div className={styles.card} key={user["_id"]} onClick={()=>handleDisplayUserProfile(user)}>
            {user["hasImage"]?<img src={`${getDisplayPicture}/${user["image"]}`} alt="Profile Photo" />:<img src={defaultUserImage} alt="Profile Photo" />}
            <h1>{`${user["firstName"]} ${user["lastName"]}`}</h1>
            <h2>{`${user["course"]}`}</h2>
        </div>
        
    )}
    {openProfile?<DisplayUserProfile trigger={trigger} setTrigger={setTrigger} setIsFindUser={setIsFindUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} user={clickedUser} setOpenProfile={setOpenProfile} /> : ""}
    </div>

}