import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./LoginForm.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // const [error, setError] = useState("");
    const MySwal = withReactContent(Swal)
    const errorShow = () => {

        MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to Log in !",

        });
    }
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                username: username,
                password: password,
            });
            //getting role response from the backend
            const role = response.data;
            console.log(role.role);
            //Handling the response as role based
            if (role.role === "admin") {

                MySwal.fire({
                    icon: "success",
                    title: `${role.username}`,
                    text: "Logged in",
                    footer: "Accessing the Admin Panel"

                }).then(() =>
                    navigate("/admin",
                        { state: { username: username, userid: role.id } })
                )
            }
            else if (role.role === "student") {

                MySwal.fire({
                    icon: "success",
                    title: `${role.username}`,
                    text: `Logged in !`,
                    footer: "Accessing the User Panel"

                }).then(() =>
                    navigate("/user", {
                        state:
                        {
                            username: username,
                            userid: role.id
                        }
                    })
                )
                // setError("User Logged in");
            } else if (role.role === "faculty") {
                MySwal.fire({
                    icon: "success",
                    title: `${role.username}`,
                    text: `Logged in !`,
                    footer: "Accessing the Faculty Panel"

                }).then(() =>
                    navigate("/faculty", {
                        state:
                        {
                            username: username,
                            userid: role.id
                        }
                    })
                )
            } else {
                MySwal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid Credentials !",

                });
                // setError("Invalid Credential")
            }
        }
        catch (error) {
            errorShow();
            // setError("Failed to Log in")
        }


    }
    const resetForm = () => {
        setUsername("");
        setPassword("");
        // setError("");
    }



    return (
        <div className="cover">
                <h1>Authorized Login</h1>
                {/* username */}
                <input type="text"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />


                {/* password */}
                <input type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <div
                    className="login-btn"
                    onClick={handleSubmit}>
                    Login
                </div>
                <div
                    className="reset-btn"
                    onClick={resetForm}>
                    Reset
                </div>
        </div>
    )
}

export default LoginForm
