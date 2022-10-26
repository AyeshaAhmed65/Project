import React,{useState,useEffect,useRef} from "react";
import styles from './Main.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { allStudentsRoute, getDisplayPicture,allFacultiesRoute,allSeniorsRoute,host,getRecentChat } from "../ServerRoutes";
import ChatContainer from "../components/ChatContainer";
import FindUser from "../components/FindUser";
import SideBar from "../components/SideBar";
import {io} from "socket.io-client";

export default function Main(){

    const [trigger,setTrigger] = useState(false);
    const [allStudents,setAllStudents] = useState([]);
    const [allFaculties,setAllFaculties] = useState([]);
    const [allSeniors,setAllSeniors] = useState([]);
    const [user,setUser] = useState(undefined);
    const [userImage,setUserImage] = useState(undefined);
    const [isFindUser,setIsFindUser] = useState(false);
    const [userType,setUserType] = useState("");
    const [selectedUser,setSelectedUser] = useState(undefined);
    const [recentChat,setRecentChat] = useState(undefined);
    const [updateRecents,setUpdateRecents] = useState(1);
    const navigate = useNavigate();
    const socket = useRef();

    useEffect(()=>{
        if(user){
            socket.current = io(host);
            socket.current.emit("addUser",user._id);
        }
    },[user]);
    const toastOptions = {
        position:"top-center",
        autoClose:2000,
        theme:"dark",
        pauseOnHover:false
    }

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
  
    },[updateRecents]);


    useEffect(() => {
        
        if(!(localStorage.getItem("Logged-In-User"))){
            navigate("/login");
        }else{
            setUser(JSON.parse(localStorage.getItem("Logged-In-User")));
        }

    }, []);

   


    useEffect(() => {
        async function fetchMyAPI(){
            if(user){
                if(user.aud){
                    let id = user.aud;
                    const students = await axios.get(`${allStudentsRoute}/${id}`);
                    const faculties = await axios.get(`${allFacultiesRoute}/${id}`);
                    const seniors = await axios.get(`${allSeniorsRoute}/${id}`);
                    setAllStudents(students.data);
                    setAllFaculties(faculties.data);
                    setAllSeniors(seniors.data);
                }else{
                    let id = user.fid;
                    const students = await axios.get(`${allStudentsRoute}/${id}`);
                    const faculties = await axios.get(`${allFacultiesRoute}/${id}`);
                    setAllStudents(students.data);
                    setAllFaculties(faculties.data);
                }
                
            }
        }
        fetchMyAPI();
        
    }, [user]);

    return <div className={styles.Main}>

        <SideBar setUpdateRecents={setUpdateRecents} socket={socket} trigger={trigger} setTrigger={setTrigger} setSelectedUser={setSelectedUser} recentChat={recentChat} setRecentChat={setRecentChat} allSeniors={allSeniors} allFaculties={allFaculties} allStudents={allStudents} user={user} setIsFindUser={setIsFindUser} setUserType={setUserType} />
        {isFindUser?<FindUser trigger={trigger} setTrigger={setTrigger} selectedUser={selectedUser} setSelectedUser={setSelectedUser} allSeniors={allSeniors} allFaculties={allFaculties} allStudents={allStudents} setIsFindUser={setIsFindUser} setUserType={setUserType} userType={userType}  /> :<ChatContainer trigger={trigger} socket={socket} recentChat={recentChat} setRecentChat={setRecentChat} selectedUser={selectedUser} user={user}/>}
<ToastContainer />
    </div>
}





{/* {localStorage.getItem("Logged-In-User") ? <img src={`${getDisplayPicture}/${user["image"]}`} alt="" /> : ""} */}