import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'

const Signup =()=>{
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");


  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        firstname: registerFirstName,
        lastname: registerLastName,
        email: registerEmail,
      },
      withCredentials: true,
      url: "http://localhost:5000//api/users",
    }).then((res) => console.log(res));
  };



    return (
      <form>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setRegisterFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Last name" 
            onChange={(e) => setRegisterLastName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setRegisterEmail(e.target.value)} 
            
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setRegisterPassword(e.target.value)} 
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={register}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  
}


export default Signup