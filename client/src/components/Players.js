
import React, { useState, useEffect } from "react";

const Players=(props)=>{
    const { PlayerName } = props;
    const { PPG } = props;



    return(
        <div className="counter">
            <div>Player Name: {PlayerName}</div>
            <div>PPG: {PPG}</div>
        </div>
    )


}


export default Players