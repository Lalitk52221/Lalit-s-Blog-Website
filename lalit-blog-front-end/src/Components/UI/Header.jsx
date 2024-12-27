import { NavLink } from "react-router-dom";
import "../../Style/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState} from "react";
import Profile from "./Profile";
import {toggleMenu } from "../Redux/Slicer";
const Header = () => {
  const AccountName = sessionStorage.getItem("name");
  const Navbar = useSelector((state) => state.navbarItem.value);
  const isMenuOpen = useSelector((state)=>state.navbarItem.isMenuOpen);
  const [menuOpen,setMenuOpen] = useState(false)
  const menuRef = useRef(null);
  const dispatch = useDispatch()

  const handleProfile = () => {
      // if(menuOpen){
      //   setMenuOpen(true)
      //   dispatch(toggleMenu(true))
      // }else{
      //   setMenuOpen(false)
      //   dispatch(toggleMenu(false));
      // }
      setMenuOpen(prev=> !prev)
      dispatch(toggleMenu(!menuOpen))
      console.log(menuOpen, isMenuOpen)
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false)
      dispatch(toggleMenu(false))
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
        {Navbar &&
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
            <button className="account-name" onClick={handleProfile}>
              <li>{AccountName}</li>
            </button>
          </ul>
        }
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
