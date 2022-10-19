
import React, { useState, useEffect } from "react";
import  {Hawks,Celtics,Nets,Hornets,Cavaliers,Mavericks,Nuggets,Pistons, Warriors,Rockets,Pacers,Clippers,Lakers,Grizzlies,Heat,Bucks,Timberwolves,Pelicans,Knicks,Thunder,Magic,Sixers,Suns, Blazers,Kings,Spurs, Raptors,Jazz,Wizards} from './NBATeam'

const Players=(props)=>{
    const { PlayerName } = props;
    const { PPG } = props;
    const Teams = [Hawks,Celtics,Nets,Hornets,Cavaliers,Mavericks,Nuggets,Pistons, Warriors,Rockets,Pacers,Clippers,Lakers,Grizzlies,Heat,Bucks,Timberwolves,Pelicans,Knicks,Thunder,Magic,Sixers,Suns, Blazers,Kings,Spurs, Raptors,Jazz,Wizards]



    return(
        <div className="counter">
            <div>Player Name: {PlayerName}</div>
            <div>PPG: {PPG}</div>

            <label for="NBATEAM">Choose An NBA TEAM:</label>
            <select id="NBATEAM" name="NBA_TEAM">
            {Teams.map((value, index) => {
                return <option key={index}>{value.name}</option>
                })}
    
            </select>
        </div>
    )


}


export default Players