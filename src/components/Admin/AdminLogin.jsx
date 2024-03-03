import { AdminNavbar } from "../Navbar/AdminNavbar";
import { useLocation } from 'react-router-dom';
import { Avatar } from "@mui/material";
import './style/AdminLogin.css';
import Greeting from "../Greeting";
import { useEffect, useState } from "react";
import { CategorySelectUser } from "../../Services/UserService";
import CardDisplay from "./CardDisplay";
import axios from "axios";
import { createContext } from "react"

const ID = createContext();

const AdminLogin = () => {

  const [user, setUser] = useState([]);
  const [teacher, setTeacher] = useState(0);
  const [student, setStudent] = useState(0);
  const [error, setError] = useState("");
  const [ques, setQues] = useState(0);
  const [quiz, setQuiz] = useState(0);

  const location = useLocation();
  const username = location.state?.username;
  const uid = location.state?.userid;

  console.log("Fetched uid :"+ uid)

  useEffect(() => {
    getalluser();
  }, [])

  const getalluser = async () => {
    let role = "student"
    CategorySelectUser(role).then((response) => {
      setUser(response.data);
      setStudent(response.data.length);
      console.log(response.data);
    }).catch(error => console.log(error))

    role = "faculty"
    CategorySelectUser(role).then((response) => {
      setUser(response.data);
      setTeacher(response.data.length);
      console.log(response.data);
    }).catch(error => console.log(error))

    try {
      const response = await axios.get(
        "http://localhost:8080/api/questions/getAllQuestion"
      );
      setQues(response.data.length)
    } catch (error) {
      setError("Failed to fetch questions");
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/quizzes"
      );
      setQuiz(response.data.length)
    } catch (error) {
      setError("Failed to fetch quizz");
    }
  }

  console.log(student)
  console.log(teacher)
  console.log(user)
  console.log(error)
  console.log(username)

  return (
    <>
      <ID.Provider value={uid}>
        <AdminNavbar username={username} />
      </ID.Provider>
      <div className="welcome">
        <Avatar
          className="icon"
          alt="Remy Sharp"
          src="/software-engineer.png"
          sx={{ width: 96, height: 96 }}
        />
      </div>
      <div className="text">
        <Greeting />
      </div>

      <div className="cardpannel">
        <CardDisplay Title="Total Students connected : " number={student} />
        <CardDisplay Title="Total Faculties connected : " number={teacher} />
        <CardDisplay Title="Total Question connected : " number={ques} />
        <CardDisplay Title="Total Quizes connected : " number={quiz} />
      </div>
    </>
  )
}

export default AdminLogin
export { ID };
