import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FacultyNavbar } from "../Navbar/FacultyNavbar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AddNewQuestion } from "../../Services/Questionquiz";

const FacultyAddQuestion = () => {
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [correctSolution, setCorrectSolution] = useState("");
    const [technology, setTechnology] = useState("");
    const [error, setError] = useState("");

    const location = useLocation();
    const username = location.state?.username;

    const technologyOptions = [
        'C',
        'C++',
        'C#',
        'Java',
        'Python',
        '.NET',
        'JavaScript',
        'React',
        'Angular',
        'Rust',
        'Ruby',
        'Kotlin',
        'Express Js',
      ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newQuestion = {
            questionText: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            correctOption: parseInt(correctSolution),
            technology: technology

        };
        try {
            // await axios.post("http://localhost:8080/api/questions/addquestion", newQuestion);
            await AddNewQuestion(newQuestion);
            const res = Response.data;
            if (res.status == 200) {
                setQuestion("");
                setOption1("");
                setOption2("");
                setOption3("");
                setOption4("");
                setTechnology("");
                setCorrectSolution("");
            }
        } catch (error) {
            setError("Failed to add question");
        }
    }
    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid black',
        borderRadius: '5px',
        width: '600px',
        height: '50px'
    };
    const border = {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid black',
        borderRadius: '5px',
        width: '600px',
        height: '50px'
    };
    const Container1 = {
        fontSize: '16px',
        borderRadius: '5px',
        width: '600px',
        height: '50px',

    };

    console.log(technology)

    return (
        <>
            <FacultyNavbar username={username} />
            <div>
                <div className="container" style={Container1}>
                    <h2 className="mt-4 mb-3"><b>Add Questions</b></h2>
                    <div className="detail">
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label><b>Question:</b></label>
                            <input
                                type="text"
                                style={border}
                                className="form-control"
                                value={question}
                                placeholder="Enter Question"
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <div className="form-group" >
                            <label><b>Options:</b></label>
                            <input
                                type="text"
                                style={inputStyle}
                                className="form-control mb-3"
                                placeholder="Option 1"
                                value={option1}
                                onChange={(e) => setOption1(e.target.value)}
                            />
                            <input
                                type="text"
                                style={inputStyle}
                                className="form-control mb-3"
                                placeholder="Option 2"
                                value={option2}
                                onChange={(e) => setOption2(e.target.value)}
                            />
                            <input
                                type="text"
                                style={inputStyle}
                                className="form-control mb-3"
                                placeholder="Option 3"
                                value={option3}
                                onChange={(e) => setOption3(e.target.value)}
                            />
                            <input
                                type="text"
                                style={inputStyle}
                                className="form-control mb-3"
                                placeholder="Option 4"
                                value={option4}
                                onChange={(e) => setOption4(e.target.value)}
                            />
                        </div>
                        <div className="form-group my-1">
                            <label><b>Correct Solution:</b></label>
                            <select
                                style={inputStyle}
                                className="form-control"
                                value={correctSolution}
                                onChange={(e) => setCorrectSolution(e.target.value)}
                            >
                                <option value="">Select Correct Solution</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="4">Option 4</option>
                            </select>
                        </div>
                        <div className="form-group my-2">
                            <label><b>Technology:</b></label>
                            <Autocomplete
                                id="technology-select"
                                options={technologyOptions}
                                value={technology}
                                onChange={(event, newValue) => {
                                    setTechnology(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="" fullWidth />}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary my-3">
                            Add Question
                        </button>
                        {error && <div className="text-danger mt-2">{error}</div>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default FacultyAddQuestion
