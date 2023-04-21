import React from "react";
import { Button, Grid, Item, Typography} from "@mui/material"
import './ActivityOptions.scss';
import { getUserFavoriteActivities } from "../../Store/Actions/JournalAction";
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import FavoriteActivityItem from "./FavoriteActivityItem.js";

const mapDispatchToProps = (dispatch) => {
    return {
        getActivityData:(uuid) => dispatch(getUserFavoriteActivities(uuid))
    }
}

const mapStateToProps = (state) => {
    return {
        userFavoriteActivities: state?.Journal?.setFavoriteActivityData,
        currentUserDetails: state.Login.currentUserDetails
    }
}

const FavoriteActivitiesDisplay = (props) => {

    useEffect(() => {
        props.getActivityData(props.currentUserDetails.uuid)
    },[]);



    return (
        <div className="options-div"> 
       
            <Grid container id="slider-div" display={'flex'} flexDirection={'row'}  className="select-fav-activity" >
                {props.userFavoriteActivities && props.userFavoriteActivities.length > 0 && 
                props.userFavoriteActivities.map((activity, index) =>
                <FavoriteActivityItem {...activity}
                />
                )}
            </Grid>
        </div>   
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteActivitiesDisplay);


