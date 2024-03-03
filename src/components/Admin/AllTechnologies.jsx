import { useEffect, useState } from 'react'
import { AdminNavbar } from "../Navbar/AdminNavbar"
import axios from 'axios';
import './style/AllTechnologies.css'
import { Link } from 'react-router-dom';

const AllTechnologies = () => {
  const [tech, setTech] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchtech();
  }, []);

  const fetchtech = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/quizzes");
      setTech(res.data);
    }
    catch (error) {
      setError("Failed to fetch user responses");
    }
  };
  return (
    <>
      <AdminNavbar />
      <div className="box">
        <div className="showtech">
          {tech.length > 0 ? (
            tech.map((value, id) => (<Link key={id} to={"/admin/question"}>
              <div className="tech">
                {value.technology}
             </div>
              </Link>))
          ) : (
            <div className="text-danger mt-2">{error}</div>
          )}
        </div>
      </div>
    </>
  )
}

export default AllTechnologies
