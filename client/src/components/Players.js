
import React, { useState, useEffect } from "react";
import  AllTeams from './NBATeam'
import axios from 'axios'
import defaultIMG from '../IMAGES/OG.png';
import "../styles/Player.css";
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'



const Players=(props)=>{

    const [Player,setPlayer] = useState("Player Name")
    const [PlayerPoints, setPlayerPoints] = useState("")
    const [PlayerMinutes, setPlayerMinutes] = useState("")
    const [PlayerRebounds, setPlayerRebounds] = useState("")
    const [PlayerAssists, setPlayerAssists] = useState("")


    const [PlayerSteals, setPlayerSteals] = useState("")
    const [PlayerBlocks, setPlayerBlocks] = useState("")
    const [PlayerFG, setPlayerFG] = useState("")
    const [Player3PT, setPlayer3PT] = useState("")

    const [playerHeadshot, setplayerHeadshot] = useState("")





    const Teams = ["Bucks","Cavaliers","Celtics",'Clippers','Grizzlies','Hawks','Heat','Hornets','Jazz','Kings','Knicks','Lakers','Magic','Mavericks','Nets','Nuggets','Pacers','Pelicans','Pistons','Raptors','Rockets','Sixers','Spurs','Suns','Thunder','Timberwolves',"Trail_Blazers",'Warriors','Wizards']
    const [SelectedTeam, setSelectedTeam]= useState("")
    const [Roster, setRoster] = useState([""])
    const [PlayerData, setPlayerData]= useState({})

    const [myTeamPlayers, setmyTeamPlayers]= useState([])
    const [addbuttonClicked, setaddbuttonClicked]= useState(false)

    const addPlayer = (event) => {
    
        axios({
          method: "POST",
          data: {
            user: "aingkaran1995@gmail.com",
            players: [[AllTeams[SelectedTeam].id,PlayerData[Player].id]]

          },
          withCredentials: true,
          url: "http://localhost:5000/myTeam",
        }).then((res) => {
            console.log(res.data);
          })
      };
    

    const getTeamRoster=()=>{
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
                        id: (response.data.players)[i].id,
                        reference: (response.data.players)[i].reference

                    }

            }
        setRoster(newRoster)
        setPlayerData(playerInfo)
        console.log(playerInfo)
        

        }).catch((error) => {
            console.error(error)
        })

    }

    const getPlayerStats=()=>{
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

                    setPlayerFG((response.data.players[i].average.field_goals_made)/(response.data.players[i].average.field_goals_att))
                    setPlayer3PT((response.data.players[i].average.three_points_made)/(response.data.players[i].average.three_points_att))
                    setPlayerSteals(response.data.players[i].average.steals)
                    setPlayerBlocks(response.data.players[i].average.blocks)
                    setplayerHeadshot(`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${PlayerData[Player].reference}.png`)
                }

            }

        }).catch((error) => {
            console.error(error)
        })


    }


    const savePlayer=()=>{
        const playerInfo = {
            Name: Player,
            Team: AllTeams[SelectedTeam].id,
            id: PlayerData[Player].id

        }
        let myTeam = myTeamPlayers
        myTeam.push(playerInfo)

        setmyTeamPlayers(myTeam)
        console.log(myTeam)
    }


    useEffect(() => {
        getTeamRoster()
        
      }, [SelectedTeam])


    useEffect(() => {
        getPlayerStats()
        
      }, [Player])

    



  

    return(
        <div className="Player Stats">
            
            <form >
            <label className= "form-title" htmlFor="NBATEAM">TEAM  </label>

            <select className="form-select" id="NBATEAM" name="NBA_TEAM" onChange={(e) => {setSelectedTeam(e.target.value)}} >
                <option></option>
                {Teams.map((value, index) => {
                    return <option key={index}>{AllTeams[value].name}</option>
                    })}
            </select>

            <label className= "form-title" htmlFor="NBAPLAYER">Player  </label>
            <select className="form-select"  id="NBAPLAYER" name="NBA_PLAYER" onChange={(e) => {setPlayer(e.target.value)}}>
                <option></option>
                {Roster.map((value, index) => {
                    return <option key={index}>{value}</option>
                    })}
            </select>

            </form>

            
            <div className="playerData-container">
                {playerHeadshot?<img src={playerHeadshot} alt="default-img" className="defaultIMG"/>:<img src={defaultIMG} alt="default-img" className="defaultIMG"/>}
                <div className="complete-data-container">
                    
                    <div className="playerName">{Player}</div>
                    <div className="Data">
                        <div className="left-side-data">
                            <div>MIN: {parseFloat(PlayerMinutes).toFixed(1)}</div>
                            <div>PTS: {parseFloat(PlayerPoints).toFixed(1)}</div>
                            <div>REB: {parseFloat(PlayerRebounds).toFixed(1)}</div>
                            <div>AST: {parseFloat(PlayerAssists).toFixed(1)}</div>

                        </div>
                        <div className="right-side-data">
                            <div>FG: {parseFloat(PlayerFG).toFixed(2)*100}%</div>
                            <div>3P: {parseFloat(Player3PT).toFixed(2)*100}%</div>
                            <div>STL: {parseFloat(PlayerSteals).toFixed(1)}</div>
                            <div>BLK: {parseFloat(PlayerBlocks).toFixed(1)}</div>

                        </div>
                    </div>
           
                </div>
                {/* bootstrap plus icon */}
                <button onClick={()=>addPlayer()} type="button" className="btn btn-secondary btn-sm">ADD</button>


                
            </div>

        </div>
    )


}


export default Players