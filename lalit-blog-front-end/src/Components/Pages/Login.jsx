import { useState } from "react";
import "../../Style/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { showNavItem } from "../Redux/Slicer";
import Loading from "../UI/Loading";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        
        const errordata = await response.json();
        console.log(response);

        window.alert(errordata.message || "Invalid login credentials");
        setError(errordata.message || "Invalid login credentials");
        setLoading(false) 
        return;
      }
      const data = await response.json();
      // console.log(data);

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("name", data.name);
      setLoading("false")
      navigate("/");
      dispatch(showNavItem()) 
    } catch (err) {
      window.alert(err.message);
      setError(err.message);
      setLoading(false)
    }
  };
  // const handleSignup = () => {};
  return (
    <div className="container">
      {loading && <Loading/>}
       
      <div className="login-page">
        <h1>Login Form</h1>
        <div className="buttons">
          <button className="login-btn active ">Login</button>
     <NavLink to={"/signup"}>     <button className="signup-btn ">Signup</button></NavLink>
        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >
          <div className="input-boxes">
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
          </div>
          <p className="forgot">Forgot Password?</p>
          <button className="submit-login" type="submit">
            Log in
          </button>

          <p className="footer">
            Not a member?<NavLink to={"/signup"}> <span>Signup Now</span></NavLink>
          </p>
        </form>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};
export default Login;
