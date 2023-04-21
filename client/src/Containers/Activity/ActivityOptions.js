import React from "react";
import { Button, Grid, Item, Typography} from "@mui/material"
import './ActivityOptions.scss';
import Theme from '../../Theme.js';
import { getAddActivityLogo } from "../../Utils/ActivityUtils.js";
import ActivityItem from "./ActivityItem";
import { getActivityMasterData } from '../../Store/Actions/JournalAction.js';
import { useEffect } from "react";
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        getActivityData:(uuid) => dispatch(getActivityMasterData(uuid))
    }
}

const mapStateToProps = (state) => {
    return {
        activityMasterData: state?.Journal?.setActivityMasterData,
        currentUserDetails: state?.Login?.currentUserDetails
    }
}

const ActivityOptions = (props) =>{

    useEffect(() => {
        props.getActivityData(props?.currentUserDetails?.uuid)
    },[]);

    return(
 
        <div className="options-div" > 

        <Grid>

            <Grid container id="slider-div" xs ={12} display={'flex'} direction={'row'}  className="select-fav-activity" >

                {props.activityMasterData !== undefined && 
                props.activityMasterData.length>0 && 
                props.activityMasterData.map((activity, index)=>
                <ActivityItem logoId={activity.activityId} activityMaster = {activity}
                // onClick={handleClick} 
                />
                )}
                
            </Grid>

        </Grid>
        </div>   
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityOptions);


