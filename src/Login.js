import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import {Link} from 'react-router-dom';
import './index.css';

import axios from "./api/axios";
const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ "email":user, "password":pwd }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      
      setAuth({ user, pwd});
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Incorrect Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="App">
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/">Go to Home</Link>
            <hr/>
            <Link to="/products">Go to Product Page</Link>
          </p>
        </section>
        </div>
      ) : (
        <div className="App">
        <section >
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <div className="line">
              <Link to="/forgetPassword" style={{color:"white"}}>Forget Password</Link>
          </div>
          <p>
            Need an Account?
            <br />
            
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
            
          </p>
        </section>
        </div>
      )}
    </>
  );
};

export default Login;
