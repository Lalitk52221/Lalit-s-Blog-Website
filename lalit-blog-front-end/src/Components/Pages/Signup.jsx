import { useState } from "react";
import "../../Style/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
const Signup = () => {
  const[firstname,setFirstName] = useState("")
  const[lastname,setlastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://lalit-blog-backend.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({firstname, lastname, email, password, confirmpassword }),
      });
      if (!response.ok) {
        const errordata = await response.json();
        console.log(response);
        window.alert("errordata.message" || "Invalid Signup Credentials")
        setError(errordata.message || "Invalid Signup credentials");
        return;
      }
      const data = await response.json();
      console.log(data);
      navigate("/");
      window.alert("Account Successfully Created")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <h1>Signup Form</h1>
        <div className="buttons">
        <NavLink to={"/login"}>     <button className="login-btn">Login</button></NavLink>
          <button className="signup-btn active ">Signup</button>
        </div>

        <form className="login-form" onSubmit={handleSignup}>
          <div className="input-boxes">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Last Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email address"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />

            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
            />
          </div>

          <button className="submit-login" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};
export default Signup;
