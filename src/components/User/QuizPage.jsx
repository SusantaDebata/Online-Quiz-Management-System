import { useLocation } from 'react-router-dom';
import UserNavbar from '../Navbar/UserNavbar'
import { useEffect } from 'react';
import { useState } from "react"
import { GetAllQuizzes, GetQuizbyId } from '../../Services/Questionquiz';
import { SubmitAnswer } from '../../Services/UserService';
const QuizPage = () => {
  const [quizList, setQuizList] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");
  const [quizQuest, setQuizQuest] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);

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

  useEffect(() => {
    console.log("Selected Marks Ussefeffect:", totalMarks);
  }, [totalMarks]);

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
      const response =await GetQuizbyId(quizId);
      console.log(response.data);
      setQuizQuest(response.data);
      setSelectedOptions([]);
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

  const handleOptionChange = (questionId, optionNumber) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      const questionIndex = updatedOptions.findIndex(
        (option) => option.questionId === questionId
      );

      if (questionIndex !== -1) {
        // Question already exists in selectedOptions, update the option
        updatedOptions[questionIndex] = { questionId, optionNumber };
      } else {
        // Add the question and option to selectedOptions
        updatedOptions.push({ questionId, optionNumber });
      }

      return updatedOptions;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let marks = 0; // Variable to store the total marks

      // Send each user answer individually to the backend for saving
      for (const userAnswer of selectedOptions) {
        const { questionId, optionNumber } = userAnswer;

        const userAnswers = {
          userId: uid, // Replace with the actual user ID
          questionId: questionId,
          selectedOption: optionNumber,
        };

        console.log(userAnswers);

        // const response = await axios.post("http://localhost:8080/api/user-answers", userAnswers);
        const response = await SubmitAnswer(userAnswers);
        console.log("User answer submitted:", response.data);

        // Increment the marks if the selected option is correct
        const selectedQuestion = quizQuest.find(
          (question) => question.id === questionId
        );
        // console.log("Quest id", questionId);
        // console.log("Correct id", selectedQuestion.correctOption);
        // console.log("Quest id", selectedQuestion);
        if (selectedQuestion.correctOption === optionNumber) {
          marks += 1;
        }
      }

      setTotalMarks(marks); // Update the total marks state
    } catch (error) {
      setError("Failed to submit quiz");
    }
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
              <h4>Quiz Questions:</h4>
              {quizQuest.map((question) => (
                <div key={question.id} className="mb-3">
                  <h4>{question.questionText}</h4>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <label className="custom-control-input">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`question-${question.id}`}
                          value={1}
                          checked={
                            selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.questionId === question.id &&
                                selectedOption.optionNumber === 1
                            ) !== undefined
                          }
                          onChange={() => handleOptionChange(question.id, 1)}                        
                        />
                        {question.option1}
                      </label>
                    </li>
                    <li className="list-group-item">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          
                          name={`question-${question.id}`}
                          value={2}
                          checked={
                            selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.questionId === question.id &&
                                selectedOption.optionNumber === 2
                            ) !== undefined
                          }
                          onChange={() => handleOptionChange(question.id, 2)}
                          className="form-check-input"
                        />
                        {question.option2}
                      </label>
                    </li>
                    <li className="list-group-item">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={3}
                          checked={
                            selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.questionId === question.id &&
                                selectedOption.optionNumber === 3
                            ) !== undefined
                          }
                          onChange={() => handleOptionChange(question.id, 3)}
                          className="form-check-input"
                        />
                        {question.option3}
                      </label>
                    </li>
                    <li className="list-group-item">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={4}
                          checked={
                            selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.questionId === question.id &&
                                selectedOption.optionNumber === 4
                            ) !== undefined
                          }
                          onChange={() => handleOptionChange(question.id, 4)}
                          className="form-check-input"
                        />
                        {question.option4}
                      </label>
                    </li>
                  </ul>
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </form>
        {totalMarks > 0 && (
          <div className="mt-3">
            <h4>Total Marks: {totalMarks}</h4>
          </div>
        )}
      </div>
    </div>
  );
};


export default QuizPage
