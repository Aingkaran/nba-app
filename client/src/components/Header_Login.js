
import React, { useState, useEffect } from "react";
import  AllTeams from './NBATeam'
import axios from 'axios'

const Header_Login=(props)=>{



    return(
        <div >
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NBA Fantasy Stats</a>
                    <button type="button" class="btn btn-dark">LOGIN</button>
                    
                
                </div>
            </nav>
            

        </div>
    )


}


export default Header_Login