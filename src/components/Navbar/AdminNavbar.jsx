import CustomDropdown from "../Button/Dropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './style/AdminNavbar.css'
import { ID } from "../Admin/AdminLogin";
import { useContext } from "react";
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prop-types

export const AdminNavbar = ({ username }) => {
    const uid = useContext(ID);
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
    }

    console.log("Admin Navbar Fetched :"+uid)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse container-fluid" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">
                            Admin Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/show-quiz">
                            All Quizzes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/alltech">
                            All Technologies
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/showuserrecord">
                            Show User Response
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/category-student">
                            All Students
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/category-faculty">
                            All Faculties
                        </Link>
                    </li>

                    <li className="nav-item">
                        {username && <span className="nav-link">Welcome, {username}!</span>}
                    </li>
                </ul>
                {/* dropdown */}
                <CustomDropdown id={uid} />
                {/* dropdown */}
                <button className="btn btn-outline-light" onClick={handleLogout} style={{ marginLeft: "8px" }}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

AdminNavbar.propTypes = {
    username: PropTypes.string 
  }
