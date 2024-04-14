import { useEffect, useState } from 'react';
import UserNavbar from '../Navbar/UserNavbar';
import { GetAllQuestion } from '../../Services/Questionquiz';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import QuestionBankQuiz from './QuestionBankQuiz';

const QuestionBank = () => {
     const [questions, setQuestions] = useState([]);
     const [error, setError] = useState("");
     const [page, setPage] = useState(1);
     const [currentset, setCurrentset] = useState([]);
     const quesno = Math.ceil(questions.length / 5);

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
               for (let i = 0; i < page * 5; i++) {
                    if (questions[i] != null)
                         setCurrentset(...currentset,JSON.stringify(questions[i]));
                    else
                         break;
               }
          } catch (error) {
               setError("Failed to fetch questions");
          }
     };

     const changepage = (e, value) => {
          setPage(value);
          for (let i = 0; i < page * 5; i++) {
               if (questions[i] != null)
                    setCurrentset(...currentset,JSON.stringify(questions[i]));
               else
                    break;
          }
     }

     console.log("currentset : " + currentset);

     return (
          <div>
               <UserNavbar />
               <div className="container">
                    <h2 className="mt-4 mb-3">Question Bank</h2>
                    {questions.length > 0 ? (
                         <div className="question_pallet">

                              <QuestionBankQuiz data={currentset} />

                              <div className='footer'>
                                   <Stack spacing={2}>
                                        <Pagination count={quesno} color="secondary" page={page} onChange={changepage} />
                                   </Stack>
                              </div>
                         </div>
                    ) : (
                         <p>No questions found</p>
                    )}
                    {error && <div className="text-danger mt-2">{error}</div>}
               </div>
          </div>
     )
}

export default QuestionBank
