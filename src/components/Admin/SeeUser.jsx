import { useState, useEffect } from 'react'
import { AdminNavbar } from '../Navbar/AdminNavbar'
import { CategorySelectUser, DeleteUser} from '../../Services/UserService'
import { useNavigate, useParams } from 'react-router-dom'

const SeeUser = () => {
     const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const {role} = useParams();

  useEffect(() => {
     categoryselectuser(role);
   })

   const categoryselectuser = (Role) => {
     CategorySelectUser(Role).then((response) => {
       setUsers(response.data);
       console.log(response.data);
     }).catch(error => console.log(error))
   }
 
   const handleUpdateUser = (id) => {
     navigate(`/admin/update-user/${id}`);
   }
 
   const handleDeleteUser = (id) => {
     console.log(id);
     DeleteUser(id).then(() => {
       categoryselectuser();
     }).catch((error => {
       console.log(error)
     }))
   }

  return (
    <div>
      <AdminNavbar />
      <h2 style={{ textAlign: "center", marginTop: "5px", color: "#676767", fontWeight: "700" }}>Users Details</h2>
      <table className='table table-striped table-bordered' >
        <thead>
          <tr className='text-center'>
            <th>User Id</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Password</th>
            <th>User Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className='text-center' key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button className='btn btn-info' onClick={() => handleUpdateUser(user.id)}>Update</button>
                <button style={{ marginLeft: '10px' }} className='btn btn-danger' onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SeeUser
