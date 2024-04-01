import './Style/Quizpage.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useState } from "react";
import PropTypes from 'prop-types';
import { SubmitAnswer } from '../../Services/UserService';

const Quiz = (props) => {

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  let count=props.current;

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

  const sumitauto = async() => {
    let marks = 0;
    for (const userAnswer of selectedOptions) {
    const { questionId, optionNumber } = userAnswer;
    const userAnswers = {
      userId: props.uid, // Replace with the actual user ID
      questionId: questionId,
      selectedOption: optionNumber,
    };
    console.log(userAnswers);
    const response = await SubmitAnswer(userAnswers);
    console.log("User answer submitted:", response.data);
    const selectedQuestion = props.quizQuest.find(
      (question) => question.id === questionId
    );
    if (selectedQuestion.correctOption === optionNumber) {
      marks += 1;
    }
    setTotalMarks(marks);
    props.onSubmit(count+1);
  }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let marks = 0; // Variable to store the total marks

      // Send each user answer individually to the backend for saving
      for (const userAnswer of selectedOptions) {
        const { questionId, optionNumber } = userAnswer;

        const userAnswers = {
          userId: props.uid, // Replace with the actual user ID
          questionId: questionId,
          selectedOption: optionNumber,
        };

        console.log(userAnswers);

        // const response = await axios.post("http://localhost:8080/api/user-answers", userAnswers);
        const response = await SubmitAnswer(userAnswers);
        console.log("User answer submitted:", response.data);

        // Increment the marks if the selected option is correct
        const selectedQuestion = props.quizQuest.find(
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
      props.onSubmit(count+1);
    } catch (error) {
      props.errordis("Failed to submit quiz");
    }
  };

  console.log(totalMarks);

  console.log(props.question);

  return (
    <div key={props.question.id} className="mb-3">
                  <div className="timer">
                    <CountdownCircleTimer
                      size={50}
                      strokeWidth={7}
                      isPlaying
                      duration={props.question.timegiven}
                      colors={['#009432', '#44bd32', '#fbc531', '#e84118']}
                      colorsTime={[20, 13, 7, 0]}
                      onComplete={() => {
                        // handleSubmit(e);
                        console.log(selectedOptions);
                        sumitauto();
                      }}
                    >
                      {({ remainingTime }) => remainingTime + " s"}
                    </CountdownCircleTimer>
                  </div>
                  <h4>{props.question.questionText}</h4>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <label className="custom-control-input">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`question-${props.question.id}`}
                          value={1}
                          checked={
                            selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.questionId === props.question.id &&
                                selectedOption.optionNumber === 1
                            ) !== undefined
                          }
                          onChange={() => handleOptionChange(props.question.id, 1)}
                        />
                        {props.question.option1}
                      </label>
                    </li>
                    <li className="list-group-item">
                      <label className="form-check-label">
                        <input
                          type="radio"

                          name={`question-${props.question.id}`}
                          value={2}
                          checked={
                            selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.questionId === props.question.id &&
                                selectedOption.optionNumber === 2
                            ) !== undefined
                          }
                          onChange={() => handleOptionChange(props.question.id, 2)}
                          className="form-check-input"
                        />
                        {props.question.option2}
                      </label>
                    </li>
                    <li className="list-group-item">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name={`question-${props.question.id}`}
                          value={3}
                          checked={
                            selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.questionId === props.question.id &&
                                selectedOption.optionNumber === 3
                            ) !== undefined
                          }
                          onChange={() => handleOptionChange(props.question.id, 3)}
                          className="form-check-input"
                        />
                        {props.question.option3}
                      </label>
                    </li>
                    <li className="list-group-item">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name={`question-${props.question.id}`}
                          value={4}
                          checked={
                            selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.questionId === props.question.id &&
                                selectedOption.optionNumber === 4
                            ) !== undefined
                          }
                          onChange={() => handleOptionChange(props.question.id, 4)}
                          className="form-check-input"
                        />
                        {props.question.option4}
                      </label>
                    </li>
                  </ul>
                  <br/>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
                </div>
  )
}

export default Quiz

Quiz.propTypes = {
  question: PropTypes.object,
  id: PropTypes.number,
  option1: PropTypes.string,
  option2: PropTypes.string,
  option3: PropTypes.string,
  option4: PropTypes.string,
  quizQuest: PropTypes.array,
  uid: PropTypes.string,
  errordis: PropTypes.func,
  onSubmit: PropTypes.func,
  current: PropTypes.number
}
