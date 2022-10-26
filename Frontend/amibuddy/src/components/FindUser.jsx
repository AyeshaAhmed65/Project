import React,{useState,useEffect} from "react";
import styles from './FindUser.module.css';
import Card from './Card';


export default function FindUser({trigger,setTrigger,allStudents,allFaculties,allSeniors,user,setIsFindUser,setUserType,userType,setSelectedUser,selectedUser}){

const [students,setStudents] = useState(false);
const [faculties,setFaculties] = useState(false);
const [seniors,setSeniors] = useState(false);
const [search,setSearch] = useState("");
useEffect(()=>{
    if(userType === "students"){
        setSeniors(false);
        setFaculties(false);
        setStudents(true);
    }else if(userType === "faculties"){
        setSeniors(false);
        setFaculties(true);
        setStudents(false);
    }else if(userType == "seniors"){
        setSeniors(true);
        setFaculties(false);
        setStudents(false);
    }
},[userType])

const handleSearch = (e)=>{
    setSearch(e.target.value);
}

const clearSearch = ()=>{
    setSearch("");
}

return <div className={styles.displayArea}>
    <div className={styles.searchBar}>
    <label>Search for stuff</label>
  <input type="text" placeholder="Enter Name....." onChange={handleSearch} value={search} />
  <button onClick={clearSearch}>X</button>    
	
    </div>
    
        {students?<Card trigger={trigger} setTrigger={setTrigger} setIsFindUser={setIsFindUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={allStudents} search={search}/>:""}
        {faculties?<Card trigger={trigger} setTrigger={setTrigger} setIsFindUser={setIsFindUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={allFaculties} search={search}/>:""}
        {seniors?<Card trigger={trigger} setTrigger={setTrigger} setIsFindUser={setIsFindUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={allSeniors} search={search}/>:""}
    </div>

}