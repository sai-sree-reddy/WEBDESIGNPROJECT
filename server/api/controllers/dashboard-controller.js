import * as dashboardService from '../services/dashboard-service.js';
import { httpUtils } from '../utils/index.js';

export const get = async (request, response)=>{
    try {
        const id = request.params.userUUID;
        const timeline = request.query.timeline;
        const detailsRequested = request.query.required;
        let responseObj = {};
        if(detailsRequested==="all"){
            const exerciseStats = await dashboardService.getExerciseStats(id, timeline);
            const leaderBoardStats = await dashboardService.getLeaderBoardStats(id, timeline);
            const healthStats = await dashboardService.getHealthStats(id, timeline);
            responseObj.exercise = exerciseStats;
            responseObj.leaderboard = leaderBoardStats;
            responseObj.health = healthStats;
        }
        else if(detailsRequested==="exercise"){
            const exerciseStats = await dashboardService.getExerciseStats(id, timeline);
            responseObj.exercise = exerciseStats;
        }
        else if(detailsRequested==="leaderboard"){
            const leaderBoardStats = await dashboardService.getLeaderBoardStats(id, timeline);
            responseObj.leaderboard = leaderBoardStats;
        }
        else if(detailsRequested==="health"){
            const healthStats = await dashboardService.getHealthStats(id, timeline);
            responseObj.health = healthStats;
        }
        
        httpUtils.setSuccessResponse(responseObj,response);
    } catch (error) {
        httpUtils.setErrorResponse(error, response);
    }
}