/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { AdminNavbar } from '../Navbar/AdminNavbar';
import { GetUserAnswers } from '../../Services/UserService';

const ShowUserResponse = () => {
    const [responses, setResponses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUserResponses();
    }, []);

    const fetchUserResponses = async () => {
        try {
            // const response = await axios.get(
            //     "http://localhost:8080/api/user-answers"
            // );
            const response = await GetUserAnswers();
            setResponses(response.data);
        } catch (error) {
            setError("Failed to fetch user responses");
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <h2 className="mt-4 mb-3">User Responses</h2>
                {responses.length > 0 ? (
                    <table className="table table-hover table-striped">
                        <thead className='table-primary'>
                            <tr>
                                <th>User</th>
                                <th>Question</th>
                                <th>Selected Option</th>
                                <th>Correct Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.map((response) => (
                                <tr key={response.id}>
                                    <td>{response.users.username}</td>
                                    <td>{response.questions.questionText}</td>
                                    <td>{response.selectedOption}</td>
                                    <td>{response.questions.correctOption}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No user responses found</p>
                )}
                {error && <div className="text-danger mt-2">{error}</div>}
            </div>
        </div>
    )
}

export default ShowUserResponse
