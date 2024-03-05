import { useEffect, useState } from 'react';
import { AdminNavbar } from '../Navbar/AdminNavbar';
import "./style/AddUser.css"
import { GetUserById, InsertUser, UpdateUser } from '../../Services/UserService';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const AddUser = () => {
    const[role,setRole] = useState("faculty")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const { id } = useParams();
    const navigator = useNavigate();
    useEffect(() => {
        if (id) {
            GetUserById(id).then((response) => {
                console.log(response)
                setEmail(response.data.email)
                setPassword(response.data.password)
                setUsername(response.data.username)
                setRole(response.data.role)
            })

        }
    }, [id])

    const pageTitle = () => {
        if (id) {
            return <h2 className='text-center'>Update User</h2>
        }
        else {
            return <h2 className='text-center'>Add User</h2>
        }
    }
    const saveOrupdate = (e) => {
        e.preventDefault();

        const user = { email, password, username, role};
        if (id) {
            UpdateUser(user, id).then((response) => {
                console.log(response.data);
                if (role ==="student") {
                    navigator("/admin/category-student")
                }
                else if (role === "faculty") {
                    navigator("/admin/category-faculty")
                }
                //navigator("/admin/viewusers")
            })
        }
        else {
            InsertUser(user).then((response) => {
                console.log(response);
                setEmail("");
                setPassword("");
                setUsername("");
                setRole("faculty")
                if (response.status == 200) {
                    Swal.fire({
                        icon: "success",
                        title: `New ${role} Added`,
                        text: "Successfully"
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            })
        }
    }



    return (
        <div>
            <AdminNavbar />
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <form onSubmit={saveOrupdate}>
                    <div className='main'>
                        {

                            pageTitle()
                        }
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <FormControl>
                                <FormLabel className='fontsrole'>Select Role</FormLabel>
                                <RadioGroup row
                                    defaultValue="faculty"
                                    name="radio-buttons-group"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <FormControlLabel className='change' value="admin" control={<Radio />} label="Admin" />
                                    <FormControlLabel className='change' value="faculty" control={<Radio />} label="Faculty" />
                                    <FormControlLabel className='change' value="student" control={<Radio />} label="Student" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )



}

export default AddUser
