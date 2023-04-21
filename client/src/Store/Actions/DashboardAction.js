import {HTTP} from '../../HTTP';
import {showLoaderAction, hideLoaderAction} from './LoaderAction.js';

export const DashboardActionTypes = {
    FETCH_USER_DASHBOARD_DETAILS: "FETCH_USER_DASHBOARD_DETAILS",
    FETCH_USER_EXERCISE_DETAILS: "FETCH_USER_EXERCISE_DETAILS",
    FETCH_USER_LEADERBOARD_DETAILS: "FETCH_USER_LEADERBOARD_DETAILS",
    FETCH_USER_HEALTH_DETAILS: "FETCH_USER_LEADERBOARD_DETAILS",
}

export const setAllDashboardStats = (payload) => {
    return {
        type: DashboardActionTypes.FETCH_USER_DASHBOARD_DETAILS,
        payload
    }
}

export const getActivityStatsForUser = (username, timeline="daily",required="all") => {
    return async(dispatch, getState) => {
        let headers =  HTTP.generateHeaders("application/json");
        try {
            dispatch(showLoaderAction())
            const url = `http://localhost:9000/dashboard/${username}?timeline=${timeline}&required=${required}`;
            const response = await HTTP.get(url, headers)
            if(required==="all"){
                dispatch(setAllDashboardStats(response.data));
            }
            else if(required==="exercise"){
                dispatch(setExerciseDashboardStats(response.data));
            }
            else if(required==="leaderboard"){
                dispatch(setLeaderboardDashboardStats(response.data));
            }
            else if(required==="health"){
                dispatch(setHealthDashboardStats(response.data));
            }
        } 
        catch(error){
                console.log("error in getActivityStatsForUser action :"+ error);
        }  finally {
            dispatch(hideLoaderAction())
        }
        
        }
}

export const setExerciseDashboardStats = (payload) => {
    return {
        type: DashboardActionTypes.FETCH_USER_EXERCISE_DETAILS,
        payload
    }
}

export const setLeaderboardDashboardStats = (payload) => {
    return {
        type: DashboardActionTypes.FETCH_USER_LEADERBOARD_DETAILS,
        payload
    }
}

export const setHealthDashboardStats = (payload) => {
    return {
        type: DashboardActionTypes.FETCH_USER_HEALTH_DETAILS,
        payload
    }
}