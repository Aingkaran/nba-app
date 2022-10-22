
import React, { useState, useEffect } from "react";
import  AllTeams from './NBATeam'
import axios from 'axios'
import defaultIMG from '../IMAGES/OG.png';
import "../styles/Player.css";


const Players=(props)=>{

    const [Player,setPlayer] = useState("")
    const [PlayerPoints, setPlayerPoints] = useState("")
    const [PlayerMinutes, setPlayerMinutes] = useState("")
    const [PlayerRebounds, setPlayerRebounds] = useState("")
    const [PlayerAssists, setPlayerAssists] = useState("")

    const Teams = ["Bucks","Cavaliers","Celtics",'Clippers','Grizzlies','Hawks','Heat','Hornets','Jazz','Kings','Knicks','Lakers','Magic','Mavericks','Nets','Nuggets','Pacers','Pelicans','Pistons','Raptors','Rockets','Sixers','Spurs','Suns','Thunder','Timberwolves',"Trail_Blazers",'Warriors','Wizards']
    const [SelectedTeam, setSelectedTeam]= useState("")
    const [Roster, setRoster] = useState([""])
    const [PlayerData, setPlayerData]= useState({})






    useEffect(() => {
        const Team = {
            method: 'GET',
            url: 'http://localhost:5000/',
            params: {Team: SelectedTeam},
        }

        let newRoster=[]
        let playerInfo={}



        axios.request(Team).then((response) => {
            for (let i=0;i<(response.data.players).length; i++){
                newRoster.push((response.data.players)[i].full_name)
                playerInfo[(response.data.players)[i].full_name] =
                    {
                        id: (response.data.players)[i].id

                    }

            }
        setRoster(newRoster)
        setPlayerData(playerInfo)
        

        }).catch((error) => {
            console.error(error)
        })
        
      }, [SelectedTeam])


      useEffect(() => {
        const Team = {
            method: 'GET',
            url: 'http://localhost:5000/PlayerStats',
            params: {Team: SelectedTeam},
        }

        

        axios.request(Team).then((response) => {
            for (let i=0;i<(response.data.players).length; i++){
                if (response.data.players[i].id == PlayerData[Player].id){
                    setPlayerPoints(response.data.players[i].average.points)
                    setPlayerMinutes(response.data.players[i].average.minutes)
                    setPlayerRebounds(response.data.players[i].average.rebounds)
                    setPlayerAssists(response.data.players[i].average.assists)

                }

            }

        }).catch((error) => {
            console.error(error)
        })
        
      }, [Player])

  

    return(
        <div className="Player Stats">
            
            <form >
            <label for="NBATEAM">TEAM:  </label>

            <select id="NBATEAM" name="NBA_TEAM" onChange={(e) => {setSelectedTeam(e.target.value);}} >
                <option></option>
                {Teams.map((value, index) => {
                    return <option key={index}>{AllTeams[value].name}</option>
                    })}
            </select>

            <label for="NBAPLAYER">Player:  </label>
            <select id="NBAPLAYER" name="NBA_PLAYER" onChange={(e) => {setPlayer(e.target.value);}}>
                <option></option>
                {Roster.map((value, index) => {
                    return <option key={index}>{value}</option>
                    })}
            </select>

            </form>

            
            <div className="playerData-container">
                <img src={defaultIMG} alt="default-img" className="defaultIMG"/>
                <div className="playerName">{Player}</div>
                <div className="complete-data-container">
                    <div className="left-side-data">
                        <div>Minutes: {parseFloat(PlayerMinutes).toFixed(1)}</div>
                        <div>Points: {parseFloat(PlayerPoints).toFixed(1)}</div>
                        <div>Rebounds: {parseFloat(PlayerRebounds).toFixed(1)}</div>
                        <div>Assits: {parseFloat(PlayerAssists).toFixed(1)}</div>

                    </div>
                    <div className="right-side-data">
                        <div>FG%: {parseFloat(PlayerMinutes).toFixed(1)}</div>
                        <div>3P%: {parseFloat(PlayerPoints).toFixed(1)}</div>
                        <div>Steals: {parseFloat(PlayerRebounds).toFixed(1)}</div>
                        <div>Blocks: {parseFloat(PlayerAssists).toFixed(1)}</div>

                    </div>

                </div>
              
                

            </div>

        </div>
    )


}


export default Players