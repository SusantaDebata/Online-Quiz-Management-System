import { FacultyNavbar } from "../Navbar/FacultyNavbar"
import { useLocation } from 'react-router-dom';
import { Avatar } from "@mui/material";
import Greeting from "../Greeting";
import { useEffect, useState } from "react";
import { CategorySelectUser } from "../../Services/UserService";
import CardDisplay from "../Admin/CardDisplay";
import axios from "axios";

const FacultyDashboard = () => {
     const [user, setUser] = useState([]);
     const [student, setStudent] = useState(0);
     const [ques, setQues] = useState(0);
     const [quiz, setQuiz] = useState(0);
     const [error, setError] = useState("");

     const location = useLocation();
     const username = location.state?.username;

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
     console.log(user)
     console.log(error)
     console.log(username)

     return (
          <div>
               <FacultyNavbar username={username} />
               <div className="welcome">
                    <Avatar
                         className="icon"
                         alt="Remy Sharp"
                         src="/teacher.png"
                         sx={{ width: 96, height: 96 }}
                    />
               </div>
               <div className="text">
                    <Greeting />
               </div>

               <div className="cardpannel">
                    <CardDisplay Title="Total Students connected : " number={student} />
                    <CardDisplay Title="Total Question connected : " number={ques} />
                    <CardDisplay Title="Total Quizes connected : " number={quiz} />
               </div>
          </div>
     )
}

export default FacultyDashboard
