import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header_Login from "./Header_Login";
import Signup from './Sign-Up';
import Myteam from "./Myteam";
import Players from "./Players";




const Login =()=>{
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLogin,setshowlogin]=useState(false)
  const [loginClicked, setloginClicked] = useState(false)
  const [registerClicked, setregisterClicked]= useState(false)
  const [data, setData] = useState(false);
  const [myTeamClick, setmyTeamClick] = useState(false)




  const login = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => 

    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    }));
    setshowlogin(true)
  };



   const logout=()=> {
    axios({method: "POST", url: "http://localhost:5000/logout", withCredentials: true}).then((response) => {
       console.log("response status", response)
       setData(null)

       if (response.status === 200) {

       }
   })

}
  
    
    return (
      <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NBA Fantasy Stats</a>

                    {data? <button onClick={()=>setmyTeamClick(!myTeamClick)} type="button" className="btn btn-dark">Team </button>:<button onClick={()=>setregisterClicked(!registerClicked)}  type="button" className="btn btn-dark">Register </button>}
                    {data? <button onClick={logout} type="button" className="btn btn-dark">Logout </button>:<button onClick={()=>setloginClicked(!loginClicked)}  type="button" className="btn btn-dark">Login </button>}

                    
                </div>
            </nav>
            {data ? <div >Welcome, {data.firstName}</div> : null}

        {registerClicked ? <Signup></Signup>:null}


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
        
        {myTeamClick?<Myteam updateUsername= {myTeamClick}></Myteam>:null}
        

        
      </div>

      
    )
  
}


export default Login;

