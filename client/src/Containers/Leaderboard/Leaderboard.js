import { Grid, Typography } from "@mui/material";
import { getLeaderboardIcons } from "../../Utils/LeaderboardUtils";
import Workspace from '@mui/icons-material/MilitaryTech';
import "./Leaderboard.scss";
import MiniLoader from "../../components/Loader/MiniLoader";
import React from "react";


const Leaderboard =(props)=>{
    return(
        <Grid container alignItems={"center"} justifyContent={"center"} className="leaderboard-ext">
            {props.loader?
            <MiniLoader height={250} width={250}/>:
            <React.Fragment>
            <Grid item className="logo-container">
                <Workspace color="primary" className="logo"/>
            </Grid>
            
            <Grid  display={"flex"} direction={"column"}  className="leaderboard-main">
            
            {props.activities.map((activity, index)=>
                <Grid item container display={"flex"} direction={"row"} className="leaderboard-item" >
                    <Grid item className="leaderboard-item-logo">
                        {getLeaderboardIcons(activity.activityId)}
                    </Grid>
                    <Grid item display={"flex"} direction={"row"} className="leaderboard-item-info">
                        <Grid item container justifyContent={'center'} alignItems={'center'}>
                            <Typography variant="h6" fontWeight={"bolder"} align="center"  color={"secondary"}>{`The highest you ${activity.action} is ${activity.value} ${activity.unit}`}</Typography>
                        </Grid>
                    </Grid>
            </Grid>
            )}
            
        </Grid>
        </React.Fragment>}
        </Grid>
    )
}

export default Leaderboard;