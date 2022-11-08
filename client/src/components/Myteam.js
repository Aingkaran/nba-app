
import React, { useState, useEffect } from "react";
import  AllTeams from './NBATeam'
import axios from 'axios'
import defaultIMG from '../IMAGES/OG.png';
import "../styles/Player.css";
import 'bootstrap/dist/css/bootstrap.min.css'



const Myteam=(props)=>{
    
    const updateUsername = props 
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


    const [Username, setUsername]= useState("")
    const [savedTeam, setsavedTeam]= useState([])
    const [playerList, setPlayerList]= useState([])


    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/user",
          }).then((res) => {
            setUsername(res.data.username);
            console.log(res.data.username)
          })
        
      }, [updateUsername])

// useEffect(() => {
//     getPlayerStats()
//     }, [savedTeam])

    const getPlayerList = (event) => {

            axios.request({
                
                method: "GET",
                params: {
                    user: Username,
    
                },
                url: "http://localhost:5000/getTeam",
                withCredentials: true,
            }).then((res)=>{
                console.log(res.data[0].players)
                setsavedTeam(res.data[0].players)
            }).then(getPlayerStats())
          
       

      };






    const getPlayerStats=()=>{
        const Team = {
            method: 'GET',
            url: 'http://localhost:5000/SavedPlayerStats',
            params: {Team: savedTeam[0][0]},
        }

        

        axios.request(Team).then((response) => {
            for (let i=0;i<(response.data.players).length; i++){
                if (response.data.players[i].id == savedTeam[0][1]){
                    setPlayerPoints(response.data.players[i].average.points)
                    setPlayerMinutes(response.data.players[i].average.minutes)
                    setPlayerRebounds(response.data.players[i].average.rebounds)
                    setPlayerAssists(response.data.players[i].average.assists)

                    setPlayerFG((response.data.players[i].average.field_goals_made)/(response.data.players[i].average.field_goals_att))
                    setPlayer3PT((response.data.players[i].average.three_points_made)/(response.data.players[i].average.three_points_att))
                    setPlayerSteals(response.data.players[i].average.steals)
                    setPlayerBlocks(response.data.players[i].average.blocks)
                    setplayerHeadshot(`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${response.data.players[i].reference}.png`)
                    setPlayer(response.data.players[i].full_name)
                }

            }

        }).catch((error) => {
            console.error(error)
        })


    }

    



  

    return(
        <div className="Player Stats">
                        
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
                <button onClick={()=>getPlayerList()} type="button" className="btn btn-secondary btn-sm">Update</button>
    

                
            </div>

            

        </div>
    )


}


export default Myteam