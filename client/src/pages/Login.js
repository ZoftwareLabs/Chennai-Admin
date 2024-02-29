import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      const token = response.data.userToken;
      const user = response.data.username;

      localStorage.setItem('username', user);
      localStorage.setItem('userToken', token);
      if(user==="admin1"){
        navigate("/dashBoard");
      }
      else if(user === "ele"){
        navigate("/eleDash")
      }
      else if(user === "garbage"){
        navigate("/garbageDash")
      }
      else if(user === "road"){
        navigate("/roadDash")
      }
      else{
        navigate("/waterDash")
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <div className="left">
        <h1>
          <span style={{color: 'red'}}>NAMMA</span><br />
          <span style={{color: 'white'}}>கோவை</span><br />
          {/* <span style={{color: 'white'}}>ADMIN</span><br /> */}
          
        </h1>
        </div>
        <form onSubmit={loginHandler}>
          <input type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)} />
          <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button style={{backgroundColor: 'red'}}>Login</button>

        </form>
      </div>
    </div>
  );
}

export default Login;