import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header_Login from "./Header_Login";
import {createContext} from "react";

const Name = createContext();



const Login =()=>{
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLogin,setshowlogin]=useState(false)
  const [loginClicked, setloginClicked] = useState(false)

  const [data, setData] = useState(false);




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
    setshowlogin(true)
  };


  
    
    return (
      <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NBA Fantasy Stats</a>

                    {data? <button type="button" class="btn btn-dark">Team </button>:<button  type="button" class="btn btn-dark">Register </button>}
                    {data? <button onClick={()=>setData(null)} type="button" class="btn btn-dark">Logout </button>:<button onClick={()=>setloginClicked(!loginClicked)}  type="button" class="btn btn-dark">Login </button>}

                    
                </div>
            </nav>
            {data ? <div >Welcome, {data.firstName}</div> : null}


        {loginClicked&&!data?<form onSubmit={login} >
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
          
        </form>:null}
        
    
        
      </div>

      
    )
  
}


export default Login;

export {Name};
