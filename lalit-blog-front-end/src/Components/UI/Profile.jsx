import React from 'react'
import '../../Style/Profile.css'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideNavItem } from '../Redux/Slicer';

const Profile = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        Navigate("/login");
        dispatch(hideNavItem());
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