export const host = "http://localhost:5000";

export const apiStudentRegisterRoute = `${host}/api/auth/register/Student`;
export const apiFacultyRegisterRoute = `${host}/api/auth/register/Faculty`;
export const apiLoginRoute = `${host}/api/auth/Login`;
export const setDisplayPicture = `${host}/api/auth/register/setDisplayPicture`;
export const updateDisplayPicture = `${host}/api/auth/register/updateDisplayPicture`;
export const getDisplayPicture = `${host}/api/DisplayPictures`;
export const allStudentsRoute = `${host}/api/allStudents`;
export const allFacultiesRoute = `${host}/api/allFaculties`;
export const allSeniorsRoute = `${host}/api/allSeniors`;
export const sendMessageRoute = `${host}/api/messages/addMessage`;
export const getMessageRoute = `${host}/api/messages/getMessage`;
export const updateRecentChat = `${host}/api/messages/updateRecentChat`;
export const getRecentChat = `${host}/api/messages/getRecentChat`;
export const getNewMessages = `${host}/api/messages/getNewMessages`;
