import { Grid } from '@mui/material';
import { getAddActivityLogo } from '../../Utils/ActivityUtils';
import { assignActivityToUser } from '../../Store/Actions/ActivityActions.js'
import './ActivityItem.scss';
import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getActivityMasterData } from '../../Store/Actions/JournalAction';


const mapDispatchToProps = (dispatch) => {
    return {
        assignActivityToUser: (userActivity) => dispatch(assignActivityToUser(userActivity)),
        getActivityData:(uuid) => dispatch(getActivityMasterData(uuid))

    }
}

const mapStateToProps = (state) => {
    return {
        currentUserDetails: state.Login.currentUserDetails,


    }
}


const ActivityItem = (props) => {

    

    const handleClick = async(e) => {
        e.preventDefault();
        const userFavoriteActivity={
            
            name: props.activityMaster.name,
            totalValue : 0,
            preferredValueUnit: props.activityMaster.preferredValueUnit,
            totalDuration : 0,
            preferredTimeUnit : props.activityMaster.preferredTimeUnit,
            date: new Date(),
            userUUID : props.currentUserDetails.uuid,
            
            lastModifiedDate : new Date(),
            activityMasterId : props.logoId,
            actionText: props.activityMaster.actionText,
            history: [],
        }
        let res = await props.assignActivityToUser(userFavoriteActivity);
        if(res){
            await props.getActivityData(props.currentUserDetails.uuid);
        }
    }

    return (
        
            <Grid item container xs={6} className='activity-img-container' justifyContent={"center"}>
                <img 
                className='image-item'
                height={120} 
                width={120} 
                src={getAddActivityLogo(props.logoId)} 
                alt="logo"
                onClick={handleClick}
                />
            </Grid>
        
        
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityItem);
