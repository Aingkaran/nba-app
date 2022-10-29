import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


const Signup =(props)=>{

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");

  const [registerLastName, setRegisterLastName] = useState("");

  const [registerClicked, setregisterClicked] = useState(true)
  const register = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        firstName: registerFirstName,
        lastName: registerLastName,
      },
      withCredentials: true,
      url: "http://localhost:5000/register",
    }).then((res) => setregisterClicked(false));
  };




    return (
      <div>
      {registerClicked?<form onSubmit={register}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input required
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e)=>setRegisterFirstName(e.target.value)}
            name="firstName"
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input required
            type="text" 
            className="form-control" 
            placeholder="Last name" 
            onChange={(e)=>setRegisterLastName(e.target.value)} 
            name="lastName"
            />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input required
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>setRegisterUsername(e.target.value)} 
            name="email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input required
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>setRegisterPassword(e.target.value)} 
            name="password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>:null}
      </div>
    )
  
}


export default Signup