import { useEffect, useState } from 'react'
import { AdminNavbar } from "../Navbar/AdminNavbar"
import { DeleteQuiz, GetAllQuizzes } from '../../Services/Questionquiz';

const ShowQuizzes = () => {
     const [quizz, setQuizzes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
     fetchQuizzes();
   }, []);
 
   const fetchQuizzes = async () => {
     try {
      //  const response = await axios.get(
      //    "http://localhost:8080/api/quizzes"
      //  );
      const response = await GetAllQuizzes();
       setQuizzes(response.data);
     } catch (error) {
       setError("Failed to fetch questions");
     }
   };

   const handleDeleteQuizzes = async (id) => {
     try {
       console.log(id);
      //  await axios.delete(`http://localhost:8080/api/quizzes/${id}`);
      await DeleteQuiz(id);
       fetchQuizzes(); // Refresh the question list
     } catch (error) {
       setError("Failed to delete question");
     }
   };
   
  return (
    <div>
      <div>
      <AdminNavbar />
      <div className="container">
        <h2 className="mt-4 mb-3">Show Quizzes</h2>
        {quizz.length > 0 ? (
          <table className="table table-hover table-striped">
            <thead className='table table-primary'>
              <tr>
                <th>Quizz Name</th>
                <th>Technology Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quizz.map((quizz) => (
                <tr key={quizz.id}>
                  <td>{quizz.quizName}</td>
                  <td>{quizz.technology}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteQuizzes(quizz.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No quizzes found</p>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
    </div>
  )
}

export default ShowQuizzes
