import './Dashboard.scss';
import DashboardSection from './DashboardSection';
import ActivitySlider from './ActivitySlider';
import { Grid } from '@mui/material';
import Leaderboard from '../Leaderboard/Leaderboard';
import { getActivityStatsForUser } from '../../Store/Actions/DashboardAction';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { MessageDisplay } from '../../components/MessageDisplay/MessageDisplay';

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin : (user) => dispatch(getActivityStatsForUser(user)),
        getActivityStatsForUser: (userDetails, timeline,required) => dispatch(getActivityStatsForUser(userDetails, timeline, required))
    }
}

const mapStateToProps = (state) => {
    return {
        exercise : state.Dashboard.exercise,
        health: state.Dashboard.health,
        leaderboard: state.Dashboard.leaderboard,
        currentUserDetails: state.Login.currentUserDetails,
        isLoading: state?.Loader?.showLoader
    }
}



const Dashboard = (props) => {

    const [loader, setLoader] = useState(false);

    useEffect(() => {
    setLoader(true)
    getActivityStats();
    setLoader(false);
    },[]);

    const getActivityStats = async()=>{
        await props.getActivityStatsForUser(props.currentUserDetails.uuid?props.currentUserDetails.uuid:"-1");

    }

    const onClickOfExerciseTimeline =async(timeline)=>{
        setLoader(true)
        await props.getActivityStatsForUser(props.currentUserDetails.uuid?props.currentUserDetails.uuid:"-1",timeline,"exercise");
        setLoader(false);
    }
    const onClickOfLeaderboardTimeline =async(timeline)=>{
        await props.getActivityStatsForUser(props.currentUserDetails.uuid?props.currentUserDetails.uuid:"-1",timeline,"leaderboard");
    }
    
    return(
    <div id="dashboard-main" className='dashboard-main'>
        <DashboardSection title="STUDENT COMPANION" selector={props.exercise.length>0?true:false} onClickOfTimeline={onClickOfExerciseTimeline} content={
            props.exercise.length<1?
            <MessageDisplay link={"/journal"} message={[<u>Click here</u>," to get started on your fitness journey today"]}/>:
            <ActivitySlider activities={props.exercise} loader={loader} category={"exercise"}/>
        }/>

        <Grid className='divider'></Grid>

        <DashboardSection title="Fitness Tracker" selector={props.leaderboard.length>0?true:false} onClickOfTimeline={onClickOfLeaderboardTimeline} content={
            props.leaderboard.length<1?
            <MessageDisplay link={"/journal"} message={[<u>Start</u>, " your flex journey today to see where you stand"]}/>:
          <Leaderboard activities={props.leaderboard} loader={loader} /> }/>

        <Grid className='divider'></Grid>
        
        <DashboardSection title="HEALTH" selector={props.health.length>0?true:false} onClickOfTimeline={onClickOfExerciseTimeline} content={
            props.health.length<1?
            <MessageDisplay link={"/"} message={"Coming soon"}/>:
            <ActivitySlider activities={props.health} loader={loader} category={"health"}/>
        }/>
    </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
