import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'


const Login =()=>{
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [data, setData] = useState(null);


  const login = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3000/login",
    }).then((res) => 

    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    }));
  };



  
    
    return (
      <div>
        <form onSubmit={login}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setLoginPassword(e.target.value)}
              
            />
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
          
        </form>
        
        <div>
          <h1>Get User</h1>
          <button >Submit</button>
          {data ? <h1>Welcome Back {data.firstName}</h1> : null}
        </div>
        
      </div>

      
    )
  
}


export default Login