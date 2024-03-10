import { useEffect, useState } from 'react'
import { FacultyNavbar } from "../Navbar/FacultyNavbar"
import axios from 'axios';
import './styles/QuizGenerator.css'

const QuizGenerator = () => {
    const [users, setUsers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [selectedTechnology, setSelectedTechnology] = useState("");
    const [quizName, setQuizName] = useState("");
    const [quiz, setQuiz] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid black',
        borderRadius: '5px',
        width: '400px',
        height: '50px'
    };
    const Container1 = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        width: '400px',
        height: '50px',

    };

    console.log(users);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/questions/getAllQuestion"
            );
            setQuestions(response.data);

            const distinctTechnologies = [
                ...new Set(response.data.map((question) => question.technology)),
            ];
            setTechnologies(distinctTechnologies);
            getusers()
        } catch (error) {
            setError("Failed to fetch questions");
        }
    };

    const getusers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/users"
            );
            setUsers([]);
            const Users = [
                ...new Set(response.data.map((users) => {
                    if ((users.role) === "faculty") {
                        setUsers((prev) => {
                            return ([...prev, users.username]);
                        })
                    }
                })),
            ];
            console.log(Users);
        } catch (error) {
            setError("Failed to fetch users");
        }
    };

    const handleTechnologyChange = (e) => {
        setSelectedTechnology(e.target.value);
    };

    const handleGenerateQuiz = () => {
        const filteredQuestions = questions.filter(
            (question) => question.technology === selectedTechnology
        );
        const selectedQuestions =
            filteredQuestions.length > 5
                ? getRandomItemsFromArray(filteredQuestions, 5)
                : filteredQuestions;
        setQuiz(selectedQuestions);

        const quizData = {
            quizName: quizName,
            technology: selectedTechnology,
            quizQuestions: selectedQuestions.map((question) => ({
                question: question,
                quiz: null, // Set the quiz property to null initially
            })),
        };

        console.log("Req", quizData);

        axios
            .post("http://localhost:8080/api/quizzes", quizData)
            .then((response) => {
                console.log("Quiz generated successfully:", response.data);
            })
            .catch((error) => {
                console.error("Failed to generate quiz:", error);
            });
    };

    const getRandomItemsFromArray = (array, count) => {
        const shuffledArray = array.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, count);
    };

    return (
        <div>
            <FacultyNavbar />
            <div className="container" style={Container1} >
                <h2 className="mt-3">Quiz Generator</h2>
                <div className="form-group col-auto">
                    <label htmlFor="quizName">Quiz Name:</label>
                    <input
                        type="text"
                        className="form-control "
                        style={inputStyle}
                        id="quizName"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="selectedTechnology">Select Technology:</label>

                    <select
                        className="form-control "
                        id="selectedTechnology"
                        style={inputStyle}
                        value={selectedTechnology}
                        onChange={handleTechnologyChange}
                    >
                        <option value="">Select</option>
                        {technologies.map((technology) => (
                            <option value={technology} key={technology}>
                                {technology}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleGenerateQuiz}
                    disabled={!selectedTechnology || !quizName}
                >
                    Generate Quiz
                </button>
                {quiz.length > 0 && (
                    <div>
                        <h3 className="mt-3">Quiz Questions</h3>
                        <ul className="list-group">
                            {quiz.map((question) => (
                                <li className="list-group-item" key={question.id}>
                                    {question.questionText}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {error && <div className="text-danger mt-3">{error}</div>}
            </div>
        </div>
    )
}

export default QuizGenerator
