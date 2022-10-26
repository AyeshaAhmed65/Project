import React,{useState,useEffect} from "react";
import styles from './DisplayUserProfile.module.css';
import {getDisplayPicture} from "../ServerRoutes";
import defaultUserImage from "../utils/userImage.jpg";
import settingsGif from "../svg/settings.gif"
export default function DisplayUserProfile({trigger,setTrigger,user,setOpenProfile,setSelectedUser,selectedUser,setIsFindUser}){

const handleSelectedUser=()=>{
setTrigger(!trigger);
setSelectedUser(user);
setIsFindUser(false);
}

return <div className={`${styles.holder} ${styles.open}`}  >
    <img onClick={()=>setOpenProfile(false)} className={styles.closeMenu} src="data:image/png;base64,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"></img>
    
    <img  className={styles.settingstl} src={settingsGif} alt="" />
    <img className={styles.settingsbl} src={settingsGif} alt="" />
    <img className={styles.settingsbr} src={settingsGif} alt="" />
    
    
    <div className={styles.inside}>
        <div className={styles.left}>
    {user["hasImage"]?<img src={`${getDisplayPicture}/${user["image"]}`} alt="Profile Photo" />:<img src={defaultUserImage} alt="Profile Photo" />}
    <div className={styles.wrapper}>
    <button onClick={handleSelectedUser} className={styles.messageButton}><span>Message</span></button>
    </div>
    </div>
    <div className={styles.txt}>
    <h1>{`${user["firstName"]} ${user["lastName"]}`}</h1>
    <h2>{`Course : ${user["course"]}`}</h2>
    <h3>{user["semester"]?`Semester : ${user["semester"]}`:""}</h3>
    <h4>{user["bio"]?`Bio : ${user["bio"]}`:""}</h4>
    
    </div>
    </div>
</div>
}