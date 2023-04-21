import { Grid, IconButton, Tooltip, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import  Delete from "@mui/icons-material/Delete"
import "./NotificationDialog.scss"
import { getAllSavedEvents, unsubscribeEvent } from "../../Store/Actions/EventsAction";
import MiniLoader from "../../components/Loader/MiniLoader";

const EventNotificationContent =(props)=> {

    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        async function fetchAllSavedEvents(){
            setLoader(true);
            await props.getUserSavedEvents(props.currentUserDetails.uuid?props.currentUserDetails.uuid:"-1")
            setLoader(false);
        }
        fetchAllSavedEvents();
    },[])

    const unsub =async(eventId)=>{
       await props.unsubscribeEvent(props.currentUserDetails.uuid?props.currentUserDetails.uuid:"-1", eventId)
    }

    return(
        <Grid container display={"flex"} flexDirection={"column"} className="event-notif-main">
            <Grid item container className="event-notif-title-container">
                <Typography variant="h6" color={"primary"}>
                    Registered Events
                </Typography>
            </Grid>
            <Grid item container display={"flex"} flexDirection={"column"} className="event-cards-container">
                {loader?<Grid item  className="event-card-loader" display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}><MiniLoader/></Grid>:
                <React.Fragment>
                    {props.savedEvents.length>0?
                        <React.Fragment>
                            {props.savedEvents.map((ev, index)=>
                            <Grid item container className="event-card-main" display={"flex"} flexDirection={"row"}>
                                <Grid item container xs={11} md={11} display={"flex"} flexDirection={"column"} className="event-card-details-container">
                                    <Grid item className="event-card-title-container">
                                        <Typography className="event-card-title" color={"secondary.light"}>
                                            {ev.eventName}
                                        </Typography>
                                    </Grid>
                                    <Grid item className="event-card-date-container">
                                        <Typography className="event-card-date" variant="caption" color={"secondary.light"}>
                                            {ev.eventDate} at {ev.eventTime}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={1} md={1}>
                                    <Tooltip title="Unsubscribe">
                                    <IconButton children={<Delete color="primary"/>} onClick={ (e) => unsub(ev.eventId) }/>
                                    </Tooltip>
                                </Grid>
                            </Grid>)}
                </React.Fragment>:
                <Grid item container justifyContent={"center"} className="event-emtpty-text-container"><Typography>Register for an event to stay updated</Typography></Grid>}
                </React.Fragment>}
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserSavedEvents : (userId) => dispatch(getAllSavedEvents(userId)),
        unsubscribeEvent : (userId, eventId) => dispatch(unsubscribeEvent(userId,eventId))
    }
}

const mapStateToProps = (state) => {
    return {
        currentUserDetails : state.Login.currentUserDetails,
        savedEvents: state.Events.savedEvents,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventNotificationContent);