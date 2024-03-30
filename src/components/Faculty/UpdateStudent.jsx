import { useEffect, useState } from "react";
import { FacultyNavbar } from '../Navbar/FacultyNavbar'
import { useNavigate, useParams } from 'react-router-dom';
import { GetUserById, UpdateUser } from '../../Services/UserService';

const UpdateStudent = () => {
     const [role, setRole] = useState("")
     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")
     const [username, setUsername] = useState("")
     const { id } = useParams();
     const navigate = useNavigate();

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

        const saveOrupdate = (e) => {
          e.preventDefault();
      
          const user = { email, password, username, role };
          UpdateUser(user, id).then((response) => {
            console.log(response.data);
            navigate("/faculty/all-student")
          })
     }

     return (
          <div>
               <FacultyNavbar />
               <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <form onSubmit={saveOrupdate}>
                         <div className='main'>
                              Edit Profile
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

                              <button type="submit" className="btn btn-primary">Submit</button>
                         </div>

                    </form>
               </div>
          </div>
     )
}

export default UpdateStudent
