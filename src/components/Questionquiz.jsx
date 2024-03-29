import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/questions";
const URL_BASE_1="http://localhost:8080/api/quizzes";

export const GetAllQuestion = () => axios.get(BASE_URL+"/getAllQuestion");
export const GetAllQuizzes = () => axios.get(URL_BASE_1);
export const GetQuesbyTech = (tech) => axios.get(BASE_URL+"/ques-"+tech);
export const DeleteQuetion = (id) => axios.delete(BASE_URL+`/${id}`);
export const UpdateQuestion = (id, updatedques) => axios.put(BASE_URL+`/${id}`, updatedques);
export const DeleteQuiz = (id) => axios.get(URL_BASE_1+`/${id}`);
export const AddNewQuestion = (newques) => axios.post(BASE_URL+"/addquestion", newques);
export const AddQuiz = (quizdata) => axios.post(URL_BASE_1, quizdata);
export const GetQuizbyId = (id) => axios.get(URL_BASE_1+`/${id}`);
