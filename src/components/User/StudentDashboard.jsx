import UserNavbar from "../Navbar/UserNavbar"
import { useLocation } from 'react-router-dom';
import CardS from "./CardS";
import './Style/StudentDashboard.css'

const StudentDashboard = () => {
  const location = useLocation();
  const username = location.state?.username;
  return (
    <div>
      <UserNavbar username={username} />
      <div className="body">
        <div className="navpannel">
          <CardS Title="Solve Quizes" imglink={"/quiz.png"} dlink={"/user/solve-quiz"} />
          <CardS Title="View Performance" imglink={"performance.png"} />
          <CardS Title="Quiz Bank" imglink={"/choose.png"} dlink={"/user/Question-bank"} />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
