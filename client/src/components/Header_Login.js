
import React, { useState, useEffect } from "react";
import  AllTeams from './NBATeam'
import axios from 'axios'
import Login from "./Login";
import Signup from "./Sign-Up";

const Header_Login=(props)=>{
    const {loginClicked, setloginClicked} = useState(false)
    const {User} = props
    return(
        <div >
        
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NBA Fantasy Stats</a>

                    {User? <button type="button" class="btn btn-dark">Team </button>:<button  type="button" class="btn btn-dark">Register </button>}
                    {User? <button type="button" class="btn btn-dark">Logout </button>:<button onClick={()=>{console.log("yes")}}  type="button" class="btn btn-dark">Login </button>}

                    
                </div>
            </nav>
            {User ? <div >Welcome, {User}</div> : null}


        </div>
    )


}


export default Header_Login
