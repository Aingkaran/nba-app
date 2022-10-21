
import React, { useState, useEffect } from "react";
import  AllTeams from './NBATeam'
import axios from 'axios'

const Players=(props)=>{

    const [Player,setPlayer] = useState("")
    const [PPG, setPPG] = useState("")
    const Teams = ["Bucks","Cavaliers","Celtics",'Clippers','Grizzlies','Hawks','Heat','Hornets','Jazz','Kings','Knicks','Lakers','Magic','Mavericks','Nets','Nuggets','Pacers','Pelicans','Pistons','Raptors','Rockets','Sixers','Spurs','Suns','Thunder','Timberwolves',"Trail_Blazers",'Warriors','Wizards']
    const [Roster, setRoster] = useState([""])



    const getTeamRoster = () => {
        const Team = {
            method: 'GET',
            url: 'http://localhost:5000/',
            params: {Team: Roster},
        }

        axios.request(Team).then((response) => {
            console.log(response.data)

        }).catch((error) => {
            console.error(error)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setRoster(event)
      }


    return(
        <div className="counter">
            <div>Player Name: {Player}</div>
            <div>PPG: {PPG}</div>
            <form onSubmit={getTeamRoster}>
            <label for="NBATEAM">Choose An NBA TEAM:</label>

            <select id="NBATEAM" name="NBA_TEAM" onChange={(e) => setRoster(e.target.value)}>
            {Teams.map((value, index) => {
                return <option key={index}>{AllTeams[value].name}</option>
                })}
            </select>
            <input type="submit" />

            </form>
         
            <div>{Roster}</div>
        </div>
    )


}


export default Players