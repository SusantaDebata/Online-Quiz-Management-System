import { Link } from "react-router-dom"
import "./Dropdown.css"
import PropTypes from 'prop-types';
// import { createContext } from "react"

// export const UID = createContext();

const CustomDropdown = (props) => {

    console.log("Dropdown" + props.id)

    return (
        <div className="dropdown">
            <div className="dropbtn">Manage User
                <i className="fa fa-caret-down"></i>
            </div>
            <div className="dropdown-content">
                <Link to="/admin/adduser">Add User</Link>
                <Link to={"/admin/edit/"+props.id}>Edit Profile</Link>
            </div>
        </div>



    )
}

export default CustomDropdown

CustomDropdown.PropTypes={
    id: PropTypes.string
}
