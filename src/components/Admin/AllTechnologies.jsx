import { useEffect, useState } from 'react'
// import { useNavigation } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { AdminNavbar } from "../Navbar/AdminNavbar"
import './style/AllTechnologies.css'
import { Link } from 'react-router-dom';
import { GetAllQuestion } from '../../Services/Questionquiz';

const AllTechnologies = () => {
  // const navigation = useNavigation();
  // const history = useHistory();
  const [tech, setTech] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchtech();
  }, []);

  const fetchtech = async () => {
    try {
      // const res = await axios.get("http://localhost:8080/api/questions/getAllQuestion");

      const res = await GetAllQuestion();
      const distinctTech = [
        ...new Set(res.data.map((tech)=> tech.technology)),
      ];
      setTech(distinctTech)
      console.log(distinctTech)
    }
    catch (error) {
      setError("Failed to fetch technologies");
    }
  };

  // const handleclick = (value) => {
  //   // navigation(`/admin/question/${value}`);
  //   console.log(value)
  //   // history.push(`/admin/question/${value}`);
  // }

  return (
    <>
      <AdminNavbar />
      <div className="box">
        <div className="showtech">
          {tech.length > 0 ? (
            tech.map((value, id) => (<Link key={id} className='linktab' to={`/admin/question/${value}`} >
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

export default AllTechnologies
