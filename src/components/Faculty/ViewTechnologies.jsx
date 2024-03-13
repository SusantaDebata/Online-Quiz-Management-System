import { useEffect, useState } from 'react';
import { FacultyNavbar } from "../Navbar/FacultyNavbar";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./styles/ViewTechnologies.css"

const ViewTechnologies = () => {
     const [tech, setTech] = useState([]);
     const [error, setError] = useState("");

     useEffect(() => {
          fetchtech();
     }, []);

     const fetchtech = async () => {
          try {
               const res = await axios.get("http://localhost:8080/api/questions/getAllQuestion");
               const distinctTech = [
                ...new Set(res.data.map((tech)=> tech.technology)),
              ];
              setTech(distinctTech)
          }
          catch (error) {
               setError("Failed to fetch technologies");
          }
     };

     return (
          <>
          <FacultyNavbar />
          <div className="box">
            <div className="showtech">
              {tech.length > 0 ? (
                tech.map((value, id) => (<Link key={id} className='linktab' to={`/faculty/Ques/${value}`} >
                <div className="tech">
                  {value}
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

export default ViewTechnologies
