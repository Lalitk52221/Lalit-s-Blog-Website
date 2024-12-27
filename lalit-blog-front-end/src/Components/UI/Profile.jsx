import React from 'react'
import '../../Style/Profile.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideNavItem, toggleMenu } from '../Redux/Slicer';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        navigate("/login");
        dispatch(hideNavItem());
        dispatch(toggleMenu(false))
      };

  return (
    <div className='profile'>
        <ul>
            <li>Change Profile Pic</li>
            <li>Change Password</li>
            <li onClick={handleLogout}>Logout</li>
        </ul>
    </div>
  )
}

export default Profile