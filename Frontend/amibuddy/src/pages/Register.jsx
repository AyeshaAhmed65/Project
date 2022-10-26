import React,{useState,useEffect} from "react";
import styles from './Register.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import { apiStudentRegisterRoute,apiFacultyRegisterRoute,setDisplayPicture,updateDisplayPicture } from "../ServerRoutes";
export default function Register(){
    const navigate = useNavigate();
    const [hideForm,setHideForm] = useState(false);
    const[isFaculty,setIsFaculty] = useState(false);
    const [dp,setDp] = useState(undefined);
    const [sendableDp,setSendableDp] = useState(undefined);
    const studentCourses = [
        'Bachelor of Business Administration', 'Bachelor of Commerce in Accounting', 'Bachelor of Finance', 'Master of Business Administration', 'Executive Master of Business Administration', 'Post-Graduate Diploma in Digital Marketing Strategies', 'Bachelor of Technology (Mechatronics)', 'Bachelor of Technology (Computer Science & Engineering)', 'Bachelor of Technology (Electrical and Electronics Engineering)', 'Bachelor of Technology (Civil Engineering)', 'Bachelor of Technology (Aerospace Engineering)', 'Bachelor of Technology (Solar and Alternate Energy)', 'Bachelor of Technology (Mechanical Engineering)', 'Bachelor of Science in Information Technology', 'Doctor of Philosophy (Engineering)', 'Master of Business Administration (Construction Project Management)', 'Bachelor of Science (Honours) Forensic Sciences', 'Bachelor of Technology (Nanotechnology)', 'Master of Science (Forensic Sciences)', 'Doctor of Philosophy (Forensic Sciences)', 'Bachelor of Architecture', 'Bachelor Of Interior Design', 'Masters In Interior Design', 'Bachelor of Arts Bachelor of Law (Honours)', 'Bachelor of Business Administration Bachelor of Law (Honours)', 'Bachelor of Fine Arts (Animation)', 'Bachelor Of Design (Fashion Design)', 'Bachelor Of Arts (Honours) Applied Psychology', 'Bachelor Of Arts (Journalism And Mass Communication)', 'Bachelor Of Arts (Film And Television Production)', 'Master Of Arts (Applied Psychology)', 'Bachelor of Hotel Management', 'Bachelor of Arts Tourism Administration', 'Amity University Foundation Programme'
    ]
    const facultyCourses = [
        "Business School","Engineering and Technology","Science","Architecture","Design","Law","Arts and Humanities","Hospitality","Tourism","Foundation Programmes",
    ]

    const toastOptions = {
        position:"top-center",
        autoClose:2000,
        theme:"dark",
        pauseOnHover:false
    }
    const [data,setData] = useState({
        firstName : "",
        lastName : "",
        aud : "",
        password : "",
        course : "",
        semester : "",
    });

    const Submit = async ()=>{
        const {firstName,lastName,password,course,aud,semester} = data;
        if(!isFaculty){
        if(firstName === "" || lastName === "" || password === "" || course === "" ||aud === "" || semester === ""){
            toast.error("Some Field Is Empty",toastOptions);
        }else{ 
            let hasImage = false;
            const serverData = await axios.post(apiStudentRegisterRoute,{
                firstName,lastName,password,course,aud,semester,hasImage
            });

            if(serverData.data.status === false){
                toast.error(serverData.data.msg,toastOptions);
            }else{
                toast.success("Student Account Created",toastOptions);
                setHideForm(true);
            }
        }
        }else{
            if(firstName === "" || lastName === "" || password === "" || course === "" ||aud === ""){
                toast.error("Some Field Is Empty",toastOptions);
            }  else{
                let fid = aud;
                let hasImage = false;
                const serverData = await axios.post(apiFacultyRegisterRoute,{
                    firstName,lastName,password,course,hasImage,fid
                });
    
                if(serverData.data.status === false){
                    toast.error(serverData.data.msg,toastOptions);
                }else{
                    toast.success("Faculty Account Created",toastOptions);
                    setHideForm(true);

                }
            }
        }  
        }
        function handleImageChange (e){
            setDp(URL.createObjectURL(e.target.files[0]));
            setSendableDp(e.target.files[0]);
            
        }


        const postImage = async()=>{
            const image = new FormData();
            image.append('image',sendableDp,sendableDp.name);
            let id = data["aud"];
            const serverData = await axios.post(setDisplayPicture,image);
            if(serverData.data.status === false){
                toast.error(serverData.data.msg,toastOptions);
            }else{
                toast.success("File Processing",toastOptions);
                const filePath = serverData.data.filename;
                const updateUserData = await axios.post(updateDisplayPicture,{
                    filePath,id
                });

                if(serverData.data.status === false){
                    toast.error(serverData.data.msg,toastOptions);
                }else{
                    toast.success("Image Added !",toastOptions);
                    setHideForm(false);
                }

                navigate("/Register");
            }
        }

    function handleChange(e){
        if(e.target.name !== "facultySelect"){
        setData({...data,[e.target.name]:e.target.value });
        }else{
            if(e.target.value === "Faculty"){
                setIsFaculty(true)
            }else{
                setIsFaculty(false)
            }

        }
    }

    return <div className={styles.RegisterPage}>
        <div className={hideForm?"":styles.hide}>
        <div className={styles.imageBoxForm}>
        {dp && <img className={styles.dp} src={dp} alt="The current file" />}
        {!dp && <div className={styles.stretch}><img className={styles.dp} src="/defaultImage.png" alt="Default Image" /></div>}
        <div className={styles.imageBox}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABrElEQVRoge2Zu0oEMRSGP29oI+JiIQi+goWNT2BhJVj5GIKF+BhaCYLgI9hspYWFNjZbaGUpWIqFVt6aiLuOmckkOSczcX4Ylplk/pNvzp5MNgud2qVPoeMOWFTkEANRh/kOKuGpCiMJMhj6XIgcwxpUwnMeuEEpM5IgoAgjDQJKMBogoACjBQLCMJogIAijDQJCMClAQAAmFQhEhpFeotQ5BmWmYw5BXfrVUciDsY5jMsDUVz4PpRJ+3MO0kepAmqZsQHyLPfaUHDwr/vuMxHyvRFE2GelAlHURamBbNIZuztVVD7j3uK8wYNt1LRCAFc/7RgbceLWhRnpAn8DdyNQZmQLOzRgugWlfo9QgR4zW1omvkVSxuxT/vml7BjaBJ3O+1yaQLeAdeAM2zLV1c/4BbMcCkdQq8GLi7vxq2zXXX4G1OqbaIEvAg4l5aulzbNofgWVXY02QWX7+/LnCPkPNANem3y0w52KuBTIBnFFdP3+193H4OaIFcojbRGDrc1AVIOV7pAykoDYsUZzUgTRN2YC47qJoFrzXDk02GWnc/tSQyr4FhXFnk5EvEF4w9YSG5igAAAAASUVORK5CYII=" />
        <input onChange={handleImageChange} type="file" name="ii" id = "image-select" accept="image/png, image/jpeg" />
        <label htmlFor="image-select">Choose a file</label>
        
        </div>
        <button className={styles.ImageButton} onClick={postImage}>Save Image</button>
        

            </div >
        </div>
        <a href="https://amityuniversity.ae/" rel="noopener noreferrer" target="_blank">
 <svg className={styles.amityLogo} version="1.0" xmlns="http://www.w3.org/2000/svg"  width="150.000000pt" height="100.000000pt" viewBox="0 0 254.000000 100.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M245 921 c-67 -11 -126 -28 -179 -51 l-44 -19 1 -243 c2 -272 8 -297 78 -366 35 -35 242 -142 273 -142 33 0 241 106 275 141 70 70 76 95 79 367 l3 242 -46 20 c-25 11 -71 26 -103 35 -67 18 -266 27 -337 16z m-7 -99 c17 -51 35 -45 30 9 -4 48 14 52 32 8 l13 -31 13 31 c20 48 39 39 39 -19 0 -39 -4 -50 -16 -50 -12 0 -15 8 -12 33 l3 32 -14 -35 -13 -35 -17 35 -16 35 5 -32 c4 -32 3 -33 -30 -33 -26 0 -33 3 -29 15 4 9 0 15 -10 15 -9 0 -16 -7 -16 -15 0 -8 -7 -15 -16 -15 -9 0 -13 6 -10 13 2 6 10 29 17 50 15 46 29 43 47 -11z m164 13 c-2 -19 1 -42 8 -50 10 -12 9 -15 -7 -15 -17 0 -20 8 -22 50 -1 36 2 50 12 50 9 0 12 -11 9 -35z m132 13 c5 -19 8 -20 15 -8 5 8 7 18 5 22 -3 4 2 8 10 8 20 0 20 -10 0 -38 -9 -13 -14 -32 -11 -43 4 -13 0 -19 -12 -19 -13 0 -17 7 -14 28 3 15 -3 36 -11 47 -10 13 -15 15 -16 6 0 -11 -3 -11 -16 0 -15 12 -16 9 -13 -34 3 -37 1 -47 -11 -47 -12 0 -14 10 -12 48 3 38 2 45 -9 35 -18 -18 -30 -16 -23 2 4 11 21 15 59 15 46 0 53 -3 59 -22z m-361 -20 c-3 -18 -10 -36 -16 -39 -6 -4 -6 -9 1 -13 5 -3 7 -17 4 -31 -7 -37 14 -55 64 -55 23 0 46 -4 49 -10 3 -5 -1 -10 -9 -10 -8 0 -49 -17 -90 -39 -41 -21 -77 -36 -80 -33 -3 2 -12 -1 -21 -8 -13 -11 -15 1 -15 109 l0 121 33 20 c17 11 44 20 59 20 26 0 27 -2 21 -32z m491 9 c23 -15 26 -24 26 -71 0 -62 -8 -69 -75 -59 -42 5 -44 7 -38 32 6 23 5 25 -10 12 -10 -7 -17 -20 -17 -27 0 -22 -17 -16 -25 9 l-8 22 -4 -22 c-2 -13 -9 -23 -14 -23 -5 0 -10 10 -10 23 l-2 22 -4 -22 c-6 -31 -23 -29 -23 2 0 25 3 26 48 24 55 -3 76 6 68 28 -4 9 -1 22 5 29 6 8 8 14 4 14 -4 0 -2 6 4 13 14 18 42 15 75 -6z m-473 -99 l2 -23 4 23 c5 23 27 30 39 11 4 -8 9 -7 15 2 5 9 8 6 7 -11 -2 -24 -14 -40 -30 -40 -5 0 -8 5 -8 11 0 5 5 7 10 4 16 -10 12 11 -5 25 -12 10 -15 9 -15 -7 0 -25 -8 -33 -26 -26 -16 6 -19 53 -4 53 6 0 11 -10 11 -22z m179 11 c0 -5 -4 -8 -8 -5 -5 3 -9 -1 -9 -9 0 -8 4 -12 9 -9 4 3 8 1 8 -5 0 -15 -14 -21 -29 -11 -8 4 -10 13 -7 19 4 6 2 11 -3 11 -23 0 -10 16 14 18 14 1 25 -3 25 -9z m76 -18 c-1 -18 -6 -25 -16 -23 -8 2 -23 4 -32 5 -11 1 -18 9 -18 23 0 18 5 22 33 21 30 -1 34 -4 33 -26z m224 -47 l32 -7 -4 -161 c-3 -154 -4 -163 -30 -207 -15 -25 -44 -57 -65 -71 -60 -39 -92 -58 -99 -58 -4 0 -3 32 0 71 5 46 4 75 -4 84 -6 7 -12 36 -13 64 -2 43 -4 48 -16 36 -12 -12 -12 -23 4 -76 l19 -62 -28 -23 c-18 -16 -39 -24 -64 -24 -44 0 -54 6 -70 43 -20 45 -14 93 18 157 17 33 30 74 30 92 l-1 33 -40 -43 c-33 -35 -40 -48 -34 -69 3 -14 -1 -47 -10 -74 -16 -47 -16 -50 4 -78 12 -16 21 -36 21 -43 0 -8 8 -22 18 -31 14 -13 25 -14 62 -6 25 6 49 14 55 20 5 5 14 9 20 9 27 -1 -41 -40 -71 -40 -44 0 -50 -13 -22 -50 36 -50 9 -54 -81 -14 -198 91 -251 154 -251 299 0 63 0 64 48 106 93 83 237 126 423 128 64 1 131 -2 149 -5z m-200 -474 c-27 -21 -85 -27 -95 -10 -4 6 9 10 32 10 21 0 47 7 57 15 11 8 22 12 25 9 3 -3 -5 -14 -19 -24z m0 -39 c0 -4 -12 -13 -27 -20 -25 -11 -42 -4 -43 20 0 10 35 6 42 -5 5 -7 8 -4 8 7 0 10 5 15 10 12 6 -3 10 -10 10 -14z"/> <path d="M390 603 c26 -49 26 -102 -1 -184 -23 -69 -21 -95 7 -106 34 -13 45 19 46 135 0 92 -3 118 -19 149 -11 21 -28 39 -37 41 -15 3 -15 0 4 -35z"/> <path d="M303 581 c-38 -44 -43 -56 -43 -98 0 -35 3 -44 10 -33 5 8 10 24 10 36 0 12 16 42 36 68 51 67 40 89 -13 27z"/> <path d="M948 898 c-9 -7 -39 -85 -68 -173 -59 -181 -65 -195 -85 -195 -8 0 -15 -6 -15 -13 0 -10 17 -14 60 -14 43 0 60 4 60 14 0 7 -9 13 -19 13 -26 0 -31 19 -18 68 l11 42 72 0 72 0 15 -47 c17 -52 15 -63 -14 -63 -10 0 -19 -6 -19 -14 0 -11 16 -13 70 -12 68 2 91 13 54 26 -13 5 -36 60 -80 191 -35 101 -66 185 -71 186 -5 2 -16 -2 -25 -9z m33 -143 l27 -85 -60 0 c-43 0 -59 4 -56 13 17 64 52 166 56 162 3 -3 17 -43 33 -90z"/> <path d="M1150 891 c0 -5 12 -11 28 -13 l27 -3 3 -153 c3 -154 -4 -192 -33 -192 -8 0 -15 -6 -15 -13 0 -9 18 -13 62 -12 63 1 89 18 44 29 -18 4 -27 15 -31 39 -8 43 -2 296 7 277 3 -8 33 -88 65 -178 33 -90 63 -163 68 -163 5 0 35 73 68 163 32 90 62 172 67 183 6 12 8 -45 7 -150 l-2 -170 -27 -3 c-16 -2 -28 -9 -28 -16 0 -9 22 -12 80 -12 55 1 80 5 80 13 0 6 -10 13 -22 15 -23 3 -23 4 -23 173 0 169 0 170 23 173 45 7 20 22 -37 22 l-59 0 -46 -126 c-25 -69 -49 -137 -52 -150 -3 -13 -9 -26 -13 -28 -3 -3 -32 64 -63 147 l-56 152 -61 3 c-35 2 -61 -1 -61 -7z"/> <path d="M1650 891 c0 -5 10 -11 23 -13 22 -3 22 -4 22 -173 0 -169 0 -170 -22 -173 -13 -2 -23 -9 -23 -15 0 -8 25 -12 80 -13 60 0 80 3 80 13 0 7 -11 13 -24 13 -13 0 -27 7 -30 16 -10 27 -7 294 4 315 6 10 20 19 30 19 11 0 20 5 20 10 0 6 -33 10 -80 10 -44 0 -80 -4 -80 -9z"/> <path d="M1841 863 c-7 -21 -15 -44 -17 -50 -11 -26 18 -12 55 27 29 30 46 40 70 40 l31 0 -2 -172 c-3 -171 -3 -172 -26 -178 -47 -11 -15 -25 56 -25 72 0 99 14 50 25 -23 6 -23 7 -26 178 l-2 172 31 0 c24 0 41 -10 70 -40 51 -53 63 -51 40 8 l-19 47 -149 3 -150 3 -12 -38z"/> <path d="M2190 890 c0 -5 6 -10 14 -10 8 0 40 -48 71 -106 54 -102 56 -109 53 -172 -3 -60 -5 -67 -26 -72 -13 -3 -23 -9 -23 -15 1 -15 153 -13 158 2 3 7 -8 13 -24 15 -27 3 -28 5 -31 69 -3 64 0 71 49 164 28 53 60 102 70 108 32 20 21 27 -41 27 -33 0 -60 -4 -60 -10 0 -5 9 -10 19 -10 11 0 22 -4 25 -9 6 -9 -65 -170 -74 -170 -9 1 -88 167 -82 173 3 3 14 6 24 6 10 0 18 5 18 10 0 6 -30 10 -70 10 -40 0 -70 -4 -70 -10z"/> <path d="M780 449 c0 -4 6 -9 13 -11 8 -3 12 -28 12 -75 0 -83 18 -113 70 -113 57 0 69 19 73 109 2 45 8 81 13 81 5 0 9 3 9 8 0 4 -13 7 -30 7 -16 0 -30 -3 -30 -7 0 -5 5 -8 10 -8 15 0 13 -143 -2 -158 -19 -19 -66 -15 -78 7 -16 32 -13 141 5 147 27 11 16 19 -25 19 -22 0 -40 -3 -40 -6z"/> <path d="M980 451 c0 -5 6 -11 13 -14 11 -4 13 -24 9 -84 -2 -43 -8 -79 -13 -81 -22 -9 -6 -22 26 -22 38 0 43 7 19 24 -11 9 -14 27 -12 75 l3 63 55 -81 c30 -44 58 -81 63 -81 4 0 7 40 7 90 0 74 3 91 18 99 9 6 15 11 12 11 -33 7 -71 6 -76 -1 -3 -5 2 -9 10 -9 12 0 16 -11 16 -49 0 -27 3 -56 6 -65 14 -36 -14 -11 -56 50 -25 37 -55 70 -68 75 -29 11 -32 11 -32 0z"/> <path d="M1190 448 c0 -4 5 -8 10 -8 6 0 10 -35 10 -85 0 -69 -3 -85 -15 -85 -8 0 -15 -4 -15 -9 0 -5 20 -9 45 -9 25 0 45 4 45 9 0 5 -7 9 -15 9 -12 0 -15 16 -15 85 0 50 4 85 10 85 6 0 10 4 10 8 0 4 -16 8 -35 8 -19 0 -35 -4 -35 -8z"/> <path d="M1274 449 c-2 -4 2 -9 9 -12 8 -3 28 -46 46 -97 18 -50 37 -88 41 -83 4 4 20 44 35 88 16 44 35 86 43 93 9 6 14 12 11 13 -34 5 -69 6 -69 1 0 -2 6 -10 14 -16 11 -9 9 -22 -9 -76 -13 -36 -25 -58 -28 -50 -3 8 -13 39 -24 69 -14 42 -15 55 -5 58 6 3 12 8 12 12 0 9 -70 9 -76 0z"/> <path d="M1470 448 c0 -3 5 -8 11 -10 15 -5 15 -161 0 -166 -30 -10 -4 -19 59 -20 68 -2 70 -2 85 28 18 34 7 40 -20 10 -11 -12 -31 -20 -52 -20 -32 0 -33 1 -33 40 0 34 3 40 20 40 11 0 23 -7 26 -15 12 -29 24 -14 24 28 -1 37 -2 40 -14 25 -7 -10 -23 -18 -35 -18 -17 0 -21 6 -21 35 0 33 2 35 34 35 25 0 39 -7 50 -22 9 -12 18 -19 22 -16 10 10 -16 48 -34 50 -47 4 -122 2 -122 -4z"/> <path d="M1650 448 c0 -4 7 -8 15 -8 12 0 15 -16 15 -85 0 -69 -3 -85 -15 -85 -8 0 -15 -4 -15 -9 0 -5 20 -9 45 -9 25 0 45 4 45 9 0 5 -7 9 -15 9 -11 0 -15 11 -15 40 0 22 4 40 9 40 6 0 22 -22 38 -50 21 -37 34 -50 51 -50 12 0 22 5 22 10 0 6 -6 10 -13 10 -7 0 -23 17 -35 39 l-22 39 25 16 c35 23 33 61 -2 80 -29 15 -133 18 -133 4z m128 -37 c4 -27 -20 -51 -50 -51 -14 0 -18 8 -18 41 0 39 1 40 33 37 25 -2 33 -8 35 -27z"/> <path d="M1860 440 c-11 -11 -20 -26 -20 -33 0 -24 30 -55 60 -62 30 -7 60 -29 60 -45 0 -5 -7 -16 -16 -25 -19 -19 -49 -12 -81 18 -24 21 -27 17 -17 -18 4 -17 14 -21 54 -23 43 -2 52 1 66 24 27 40 9 75 -46 94 -37 13 -46 21 -48 43 -3 24 0 27 24 27 15 0 38 -10 51 -22 24 -22 27 -18 14 16 -11 28 -75 32 -101 6z"/> <path d="M1990 449 c0 -5 7 -9 15 -9 12 0 15 -16 15 -85 0 -69 -3 -85 -15 -85 -8 0 -15 -4 -15 -9 0 -5 20 -9 45 -9 25 0 45 4 45 9 0 5 -7 9 -15 9 -12 0 -15 16 -15 85 0 73 2 85 17 85 9 0 13 3 9 7 -10 11 -86 12 -86 2z"/> <path d="M2114 450 c-22 -9 -39 -38 -28 -49 3 -3 13 4 21 17 9 12 24 22 34 22 17 0 19 -9 19 -85 0 -69 -3 -85 -15 -85 -8 0 -15 -4 -15 -9 0 -5 20 -9 45 -9 25 0 45 4 45 9 0 5 -7 9 -15 9 -12 0 -15 16 -15 85 0 78 2 85 20 85 10 0 24 -9 30 -20 11 -20 30 -28 30 -12 0 5 -6 16 -13 26 -15 20 -106 30 -143 16z"/> <path d="M2270 449 c0 -4 4 -9 8 -11 4 -1 20 -25 35 -52 30 -54 36 -116 12 -116 -8 0 -15 -4 -15 -9 0 -5 20 -9 45 -9 25 0 45 4 45 9 0 5 -7 9 -15 9 -24 0 -18 64 10 120 14 28 30 50 35 50 6 0 10 4 10 8 0 5 -13 9 -30 9 -29 0 -41 -12 -19 -19 11 -4 -18 -78 -31 -78 -13 0 -42 74 -31 78 23 8 9 18 -24 18 -19 0 -35 -3 -35 -7z"/> <path d="M780 190 c0 -7 169 -10 486 -10 321 0 483 3 479 10 -4 6 -177 10 -486 10 -313 0 -479 -3 -479 -10z"/> <path d="M1802 143 c3 -55 4 -58 31 -61 38 -5 67 23 67 63 0 41 -16 55 -62 55 l-39 0 3 -57z m67 33 c7 -8 11 -27 9 -43 -2 -22 -9 -29 -30 -31 -27 -3 -28 -2 -28 42 0 38 3 46 19 46 10 0 24 -6 30 -14z"/> <path d="M1960 156 c0 -48 19 -76 50 -76 31 0 50 28 50 76 0 59 -18 56 -22 -3 -3 -44 -5 -48 -28 -48 -23 0 -25 4 -28 48 -4 59 -22 62 -22 3z"/> <path d="M2120 141 c0 -60 0 -61 28 -61 40 0 67 22 57 46 -4 10 -8 30 -9 44 -1 21 -6 25 -38 28 l-38 3 0 -60z m58 26 c2 -12 -3 -17 -17 -17 -15 0 -21 6 -21 21 0 25 33 22 38 -4z m7 -47 c0 -8 -10 -16 -22 -18 -18 -3 -23 2 -23 18 0 16 5 21 23 18 12 -2 22 -10 22 -18z"/> <path d="M2277 143 c-26 -56 -28 -85 -3 -50 17 22 55 22 72 0 23 -32 23 -8 1 50 -12 31 -27 57 -33 57 -5 0 -22 -26 -37 -57z m49 -10 c-2 -3 -11 -3 -19 -1 -11 2 -12 9 -5 28 l10 25 9 -24 c5 -13 7 -26 5 -28z"/> <path d="M2420 140 c0 -33 4 -60 10 -60 6 0 10 27 10 60 0 33 -4 60 -10 60 -6 0 -10 -27 -10 -60z"/> </g> </svg> 
 </a>
        <div className={`${hideForm?styles.hide:""} ${styles.Form}`}>
            <h1 className={styles.header}><span className={styles.Ami}>Ami</span> <span className={styles.Buddy}>Buddy</span></h1>
            <div className={`${styles.FacultySelector}`}>
            <label className={styles.FacultySelect}>
                <select id="facultySelect" onChange={(e)=>handleChange(e)} name="facultySelect">
                    <option value={"Student"}>Student</option>
                    <option value={"Faculty"}>Faculty</option>
                </select>
            </label>
            </div>
            <div className={styles.Nameinputs}>
                <div className={styles.inputContainer}>
		            <input type="text" onChange={(e)=>handleChange(e)} name="firstName"/>
		            <label className={data["firstName"] ?styles.hide : ""}>First Name</label>		
	            </div>
                <div className={styles.inputContainer}>
		            <input type="text" onChange={(e)=>handleChange(e)} name="lastName"/>
		            <label className={data["lastName"] ?styles.hide : ""}>Last Name</label>		
	            </div>
            </div>
            <div className={styles.Nameinputs}>
                <div className={styles.inputContainer}>
		            <input type="number" onChange={(e)=>handleChange(e)} name="aud"/>
		            <label className={data["aud"] ?styles.hide : ""}>{isFaculty?"FID":"AUD"}</label>		
	            </div>
                <div className={styles.inputContainer}>
		            <input type="text" onChange={(e)=>handleChange(e)} name="password"/>
		            <label className={data["password"] ?styles.hide : ""}>Password</label>		
	            </div>
            </div>
            <div className={styles.DropDownInputs}>
            <label className={styles.select}>
                <select id="courses" onChange={(e)=>handleChange(e)} name="course">
                    <option value="" >Select Course</option>
                    
                    {!isFaculty ? studentCourses.map((val,i)=>{
                        return <option key={i}  value={val}>{val}</option>
                    }) : facultyCourses.map((val,i)=>{
                        return <option key={i}  value={val}>{val}</option>
                    })}
                </select>
            </label>
            </div>
            <div className={`${styles.DropDownInputs} ${isFaculty? styles.hide : ""}`}>
            <label className={styles.select}>
                <select id="Semester" onChange={(e)=>handleChange(e)} name="semester">
                    <option value=""  >Select Semester</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                </select>
            </label>
            </div>
            <div className={styles.buttonDiv}>
        <button className={styles.SubmitButton} onClick={Submit}>Create Account</button>
        
        </div>
        <div className={styles.spanDiv}>
        <span >Already Have An Account ? <Link to="/login">Login</Link></span>
        </div>
        </div>
        <ToastContainer />
    </div>
}