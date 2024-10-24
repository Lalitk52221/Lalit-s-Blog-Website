import { NavLink, useNavigate } from "react-router-dom";
import "../../Style/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { hideNavItem } from "../Redux/Slicer";
import { useState } from "react";
import Profile from "./Profile";
const Header = () => {
  const AccountName = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const Navbar = useSelector((state) => state.navbarItem.value);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    navigate("/login");
    dispatch(hideNavItem());
  };
  const handleProfile = () => {
    if (profile === false) {
      setProfile(true);
    } else {
      setProfile(false);
    }
  };

  return (
    <div className="header">
      <nav className="navbar">
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          {" "}
          <h2 className="logo">Blogifyr</h2>
        </NavLink>
        {Navbar === false ? (
          ""
        ) : (
          <ul>
            <NavLink to="/write-blog">
              {" "}
              <li>Start Writing</li>
            </NavLink>
            <NavLink to="/">
              <li>All Blog's</li>
            </NavLink>
            <NavLink to="/myblog">
              <li>My Blogs</li>
            </NavLink>
            <li>
              <input type="search" placeholder="search" />
            </li>
            <li className="logout-btn" onClick={handleLogout}>
              Logout
            </li>
            <button className="account-name" onClick={handleProfile}>
              <li>{AccountName}</li>
            </button>
          </ul>
        )}
      </nav>
      {profile && (
        <div>
          {" "}
          <Profile />
        </div>
      )}
    </div>
  );
};
export default Header;
