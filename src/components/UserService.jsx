import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/users";
const URL_BASE_1 ="http://localhost:8080/api/user-answers";

export const GetAllUser = () => axios.get(BASE_URL)
export const CategorySelectUser = (role) =>axios.get(BASE_URL+"/category-"+role);
export const InsertUser = (user) => axios.post(BASE_URL,user);
export const DeleteUser = (userid) => axios.delete(BASE_URL+"/"+userid);
export const UpdateUser = (user,userid) => axios.put(BASE_URL+"/"+userid,user);
export const GetUserById = (userid) => axios.get(BASE_URL+"/"+userid);
export const GetUserAnswers = () => axios.get(URL_BASE_1);
export const SubmitAnswer = (answer) => axios.post(URL_BASE_1, answer);
