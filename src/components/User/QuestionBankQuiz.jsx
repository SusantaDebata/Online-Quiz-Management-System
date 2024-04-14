import PropTypes from 'prop-types';

const QuestionBankQuiz = (props) => {
  const questions = props.data;
  console.log(props.data);

  return (
    <div>
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
    </div >
  )
}

export default QuestionBankQuiz

QuestionBankQuiz.propTypes = {
  data: PropTypes.array
}
