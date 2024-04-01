import { useLocation } from 'react-router-dom';
import UserNavbar from '../Navbar/UserNavbar'
import { useEffect } from 'react';
import { useState } from "react"
import { GetAllQuizzes, GetQuizbyId } from '../../Services/Questionquiz';
import Quiz from './Quiz';
import './Style/Flex.css'

const QuizPage = () => {
  const [quizList, setQuizList] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");
  const [quizQuest, setQuizQuest] = useState([]);
  const [i, setI] = useState(0);

  const location = useLocation();
  const username = location.state?.username;
  const uid = window.sessionStorage.getItem("user");
  console.log(uid)


  useEffect(() => {
    fetchQuizList();

  }, []);

  useEffect(() => {
    // console.log("Selected Quiz:", selectedQuiz);
    if (selectedQuiz) {
      fetchQuizQuest(selectedQuiz);
    }
  }, [selectedQuiz]);

  //fetching list of quiz
  const fetchQuizList = async () => {
    try {
      // const response = await axios.get("http://localhost:8080/api/quizzes");
      const response = await GetAllQuizzes();
      setQuizList(response.data);
    } catch (error) {
      setError("Failed to fetch quiz list");
    }
  };

  const fetchQuizQuest = async (quizId) => {
    try {
      // const response = await axios.get(
      //   `http://localhost:8080/api/quizzes/getQuizQuestById/${quizId}`
      // );
      const response = await GetQuizbyId(quizId);
      console.log(response.data);
      setQuizQuest(response.data);
      // setSelectedOptions([]);
    } catch (error) {
      setError("Failed to fetch quiz questions");
    }
  };

  const handleTechnologyChange = (e) => {
    setSelectedTechnology(e.target.value);
    setSelectedQuiz("");
    setQuizQuest([]);
  };

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  if (error) {
    return <div>`${error}</div>;
  }

  const distinctTechnologies = [
    ...new Set(quizList.map((quiz) => quiz.technology)),
  ];

  return (
    <div>
      <UserNavbar username={username} />
      <div className="container">
        <h2 className="mt-3">Quiz</h2>
        <form className="mt-3">
          <div className="mb-3">
            <label className="form-label">Select Technology:</label>
            <select
              className="form-select"
              value={selectedTechnology}
              onChange={handleTechnologyChange}
            >
              <option value="">Select</option>
              {distinctTechnologies.map((technology) => (
                <option key={technology} value={technology}>
                  {technology}
                </option>
              ))}
            </select>
          </div>
          {selectedTechnology && (
            <div className="mb-3">
              <label className="form-label">Select Quiz:</label>
              <select
                className="form-select"
                value={selectedQuiz}
                onChange={handleQuizChange}
              >
                <option value="">Select</option>
                {quizList
                  .filter((quiz) => quiz.technology === selectedTechnology)
                  .map((quiz) => (
                    <option key={quiz.id} value={quiz.id}>
                      {quiz.quizName}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {selectedQuiz && quizQuest.length > 0 && (
            <div>
              <div className='flexbox'>{((i + 1) <= quizQuest.length) ? <h4>Quiz Questions: &emsp;&emsp;<div>{i + 1}/{quizQuest.length}</div></h4> : <h3>Result: </h3>} </div>
              <br/>
              {((i + 1) <= quizQuest.length) ? < Quiz key={i} question={quizQuest[i]} quizQuest={quizQuest} uid={uid} errordis={(error) => { setError(error) }} current={i} onSubmit={(val) => { setI(val) }} /> : <div className='result'>Quiz Finished. Thanks for participating.</div>}
            </div>
          )}
          <br />
        </form>
      </div>
    </div>
  );
};


export default QuizPage
