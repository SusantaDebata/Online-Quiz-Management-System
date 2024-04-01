import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom"

import './App.css'
import QuizPage from "./components/User/QuizPage"
import AdminLogin from "./components/Admin/AdminLogin"
import QuizGenerator from "./components/Faculty/QuizGenerator"
import ShowUserResponse from "./components/Admin/ShowUserResponse"
import Logins from "./components/Logs/Logins"
import AddUser from "./components/Admin/AddUser"
import FacultyAddQuestion from "./components/Faculty/FacultyAddQuestion"
import AllTechnologies from "./components/Admin/AllTechnologies"
import Editprofile from "./components/Admin/Editprofile"
import SeeQuestions from "./components/Admin/SeeQuestions"
import ShowQuizzes from "./components/Admin/ShowQuizzes"
import ViewTechnologies from "./components/Faculty/ViewTechnologies"
import ViewResponses from "./components/Faculty/viewResponses"
import ViewStudent from "./components/Faculty/ViewStudent"
import FacultyDashboard from "./components/Faculty/FacultyDashboard"
import SeeUser from "./components/Admin/SeeUser"
import Questions from "./components/Faculty/Questions"
import UpdateStudent from "./components/Faculty/UpdateStudent"
import StudentDashboard from "./components/User/StudentDashboard"
import QuestionBank from "./components/User/QuestionBank"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logins />} />
      </Routes>

      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/alltech" element={<AllTechnologies />} />
        <Route path="/admin/showuserrecord" element={<ShowUserResponse />} />
        <Route path="/admin/adduser" element={<AddUser />} />
        <Route path="/admin/update-user/:id" element={<AddUser />} />
        <Route path="/admin/category/:role" element={<SeeUser />} />
        <Route path="/admin/edit/:id" element={<Editprofile />} />
        <Route path="/admin/question/:tech" element={<SeeQuestions />} />
        <Route path="/admin/show-quiz" element={<ShowQuizzes />} />
      </Routes>

      <Routes>
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/add-Ques" element={<FacultyAddQuestion />} />
        <Route path="/faculty/quiz-generate" element={<QuizGenerator />} />
        <Route path="/faculty/seetech" element={<ViewTechnologies />} />
        <Route path="/faculty/Ques/:tech" element={<Questions />} />
        <Route path="/faculty/view-response" element={<ViewResponses />} />
        <Route path="/faculty/all-student" element={<ViewStudent />} />
        <Route path="/faculty/update-user/:id" element={<UpdateStudent />} />
      </Routes>

      <Routes>
        <Route path="/user" element={<StudentDashboard />} />
        <Route path="/user/solve-quiz" element={<QuizPage />} />
        <Route path="/user/Question-bank" element={<QuestionBank />} />
      </Routes>
    </Router >
  )
}

export default App
