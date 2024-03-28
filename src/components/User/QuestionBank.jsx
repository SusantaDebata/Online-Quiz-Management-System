import { useEffect, useState } from 'react'
import UserNavbar from '../Navbar/UserNavbar';
import { GetAllQuestion } from '../../Services/Questionquiz';

const QuestionBank = () => {
     const [questions, setQuestions] = useState([]);
     const [error, setError] = useState("");

     useEffect(() => {
          fetchQuestions();
     }, []);

     const fetchQuestions = async () => {
          try {
               // const response = await axios.get(
               //      `http://localhost:8080/api/questions/getAllQuestion`
               // );
               const response = await GetAllQuestion();
               setQuestions(response.data);
          } catch (error) {
               setError("Failed to fetch questions");
          }
     };

     return (
          <div>
               <UserNavbar />
               <div className="container">
                    <h2 className="mt-4 mb-3">Question Bank</h2>
                    {questions.length > 0 ? (
                         <table className="table table-hover table-striped">
                              <thead className='table table-primary'>
                                   <tr>
                                        <th>Question</th>
                                        <th>Option1</th>
                                        <th>Option2</th>
                                        <th>Option3</th>
                                        <th>Option4</th>
                                        <th>Correct Solution</th>
                                        <th>Technology</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {questions.map((question) => (
                                        <tr key={question.id}>
                                             <td>{question.questionText}</td>
                                             <td>{question.option1}</td>
                                             <td>{question.option2}</td>
                                             <td>{question.option3}</td>
                                             <td>{question.option4}</td>
                                             <td>{question.correctOption}</td>
                                             <td>{question.technology}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    ) : (
                         <p>No questions found</p>
                    )}
                    {error && <div className="text-danger mt-2">{error}</div>}
               </div>
          </div>
     )
}

export default QuestionBank
