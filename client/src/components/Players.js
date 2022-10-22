
import React, { useState, useEffect } from "react";
import  AllTeams from './NBATeam'
import axios from 'axios'

const Players=(props)=>{

    const [Player,setPlayer] = useState("")
    const [PPG, setPPG] = useState("")
    const Teams = ["Bucks","Cavaliers","Celtics",'Clippers','Grizzlies','Hawks','Heat','Hornets','Jazz','Kings','Knicks','Lakers','Magic','Mavericks','Nets','Nuggets','Pacers','Pelicans','Pistons','Raptors','Rockets','Sixers','Spurs','Suns','Thunder','Timberwolves',"Trail_Blazers",'Warriors','Wizards']
    const [SelectedTeam, setSelectedTeam]= useState("")
    const [Roster, setRoster] = useState([""])
    const [PlayerInfo, setPlayerInfo] =useState({})



    const getTeamRoster = (event) => {
        event.preventDefault();

        const Team = {
            method: 'GET',
            url: 'http://localhost:5000/',
            params: {Team: SelectedTeam},
        }

        let newRoster=[]

        axios.request(Team).then((response) => {
            for (let i=0;i<(response.data.players).length; i++){
                newRoster.push((response.data.players)[i].full_name)

            }
        setRoster(newRoster)
        console.log(newRoster)

        }).catch((error) => {
            console.error(error)
        })
    }

  

    return(
        <div className="counter">
            
            <form onSubmit={getTeamRoster}>
            <label for="NBATEAM">Choose An NBA TEAM:  </label>

            <select id="NBATEAM" name="NBA_TEAM" onChange={(e) => {setSelectedTeam(e.target.value);}} >
            {Teams.map((value, index) => {
                return <option key={index}>{AllTeams[value].name}</option>
                })}
            </select>

            

            <input type="submit" />
            </form>
            <label for="NBATEAM">Choose A Player:  </label>
            <select id="NBATEAM" name="NBA_TEAM" onChange={(e) => {setPlayer(e.target.value);}}>
            {Roster.map((value, index) => {
                return <option key={index}>{value}</option>
                })}
            </select>
          
            <div>Player Name: {Player}</div>
            <div>PPG: {PPG}</div>
            
         


        </div>
    )


}


export default Players