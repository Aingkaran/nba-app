
import React, { useState, useEffect } from "react";
import  AllTeams from './NBATeam'

const Players=(props)=>{
    const { PlayerName } = props;
    const { PPG } = props;
    const Teams = ["Bucks","Cavaliers","Celtics",'Clippers','Grizzlies','Hawks','Heat','Hornets','Jazz','Kings','Knicks','Lakers','Magic','Mavericks','Nets','Nuggets','Pacers','Pelicans','Pistons','Raptors','Rockets','Sixers','Spurs','Suns','Thunder','Timberwolves',"Trail_Blazers",'Warriors','Wizards']

    const [TeamChosen, setTeamChosen]= useState("")


    return(
        <div className="counter">
            <div>Player Name: {PlayerName}</div>
            <div>PPG: {PPG}</div>

            <label for="NBATEAM">Choose An NBA TEAM:</label>
            <select id="NBATEAM" name="NBA_TEAM" onChange={(e) => setTeamChosen(e.target.value)}>
            {Teams.map((value, index) => {
                return <option key={index}>{AllTeams[value].name}</option>
                })}
    
            </select>
            <div>{TeamChosen}</div>
        </div>
    )


}


export default Players