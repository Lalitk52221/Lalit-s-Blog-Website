import {NavLink, useNavigate } from "react-router-dom";
import "../../Style/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Profile from "./Profile";
import { toggleMenu } from "../Redux/Slicer";
const Header = () => {
  const AccountName = sessionStorage.getItem("name");
  const Navbar = useSelector((state) => state.navbarItem.value);
  const isMenuOpen = useSelector((state) => state.navbarItem.isMenuOpen);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate()

  const handleProfile = () => {
    // if(menuOpen){
    //   setMenuOpen(true)
    //   dispatch(toggleMenu(true))
    // }else{
    //   setMenuOpen(false)
    //   dispatch(toggleMenu(false));
    // }
    if (token) {
      setMenuOpen((prev) => !prev);
      dispatch(toggleMenu(!menuOpen));
      console.log(menuOpen, isMenuOpen);
    } else {
      return navigate("/login") ;
    }
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
      dispatch(toggleMenu(false));
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="header">
      <nav className="navbar">
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          {" "}
          <h2 className="logo">Blogifyr</h2>
        </NavLink>
        {Navbar && (
          <ul>
            <NavLink to="/">
              <li>All Blog's</li>
            </NavLink>
            <NavLink to={`${token ? "/write-blog" : "/login"}`}>
              {" "}
              <li>Start Writing</li>
            </NavLink>

            <NavLink to={`${token ? "/" : "/login"}`}>
              <li>My Blogs</li>
            </NavLink>
            {/* <li>
              <input type="search" placeholder="search" />
            </li> */}
            <button className="account-name" onClick={handleProfile}>
              <li>{`${token ? AccountName : "Login"}`}</li>
            </button>
          </ul>
        )}
      </nav>
      {isMenuOpen && (
        <div ref={menuRef}>
          <Profile />
        </div>
      )}
    </div>
  );
};
export default Header;
