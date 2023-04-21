import { DateUtils } from '../utils/index.js';
import * as userActivityService from './userActivity-service.js';
import * as userHealthService from './userHealth-service.js';
//TODO: Change activity id's

export const getExerciseStats = async (uuid, timeline) =>{
    try {
        const activities = await userActivityService.getAllActivitiesForUser(uuid);
        let exercise = [];
        if(timeline==="daily"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                let statsTotal = 0;
                let timeTotal = 0;
                stat.stat1 = statsTotal;
                stat.stat2 = timeTotal;
                stat.stat1Unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                stat.stat2Unit = activity.preferredTimeUnit?activity.preferredTimeUnit:"";
                if(activity.history.length>0){
                    let history = activity.history;
                    const days = DateUtils.getDays(activity.activityStartDate, new Date());
                    for(let j=0; j<history.length; j++){
                        let tempHistory = history[j];
                        statsTotal+= tempHistory.totalValue;
                        timeTotal+= tempHistory.totalDuration;
                    }
                    stat.stat1 = Math.round(statsTotal/days).toFixed(1);
                    stat.stat2 = Math.round(timeTotal/days).toFixed(1);
                }
                exercise.push(stat);
            }
            return exercise;
        }
        else if(timeline==="weekly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                stat.stat1 = 0;
                stat.stat2 = 0;
                stat.stat1Unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                stat.stat2Unit = activity.preferredTimeUnit?activity.preferredTimeUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let weeks = Math.ceil(days/7);
                    let weeklyValueAverageArray = [];
                    let weeklyTimeAverageArray = [];
                    let historyArray = activity.history;
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(weeks>0){
                        let history = historyArray[historyCount];
                        let weeklyTotalValue = 0;
                        let weeklyTotalTime = 0;
                        let startDate = DateUtils.getLastWeek(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (weeks===1 && history.dateTime>=startDate)){
                                weeklyTotalValue+=history.totalValue;
                                weeklyTotalTime+= history.totalDuration;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                                weeklyValueAverageArray.push(weeklyTotalValue);
                                weeklyTimeAverageArray.push(weeklyTotalTime);
                        weeks--;
                    }
                    let totalValueSum = 0;
                    let totalDurationSum =0;
                    for(let l=0; l< weeklyValueAverageArray.length; l++){
                        totalValueSum+= weeklyValueAverageArray[l];
                        totalDurationSum+= weeklyTimeAverageArray[l];
                    }
                    stat.stat1 = Math.round(totalValueSum/(Math.ceil(days/7))).toFixed(1);
                    stat.stat2 = Math.round(totalDurationSum/(Math.ceil(days/7))).toFixed(1);
                }
                exercise.push(stat);
                }
               
            return exercise; 
        }
        else if(timeline==="monthly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                let historyArray = activity.history;
                stat.stat1 = 0;
                stat.stat2 = 0;
                stat.stat1Unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                stat.stat2Unit = activity.preferredTimeUnit?activity.preferredTimeUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let months = Math.ceil(days/30);
                    let monthlyValueAverageArray = [];
                    let monthlyTimeAverageArray = [];
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(months>0){
                        let history = historyArray[historyCount];
                        let monthlyTotalValue = 0;
                        let monthlyTotalTime = 0;
                        let startDate = DateUtils.getLastMonth(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (months===1 && history.dateTime>=startDate)){
                                monthlyTotalValue+=history.totalValue;
                                monthlyTotalTime+= history.totalDuration;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                        monthlyValueAverageArray.push(monthlyTotalValue);
                        monthlyTimeAverageArray.push(monthlyTotalTime);
                        months--;
                    }
                    let totalValueSum = 0;
                    let totalDurationSum =0;
                    for(let l=0; l< monthlyValueAverageArray.length; l++){
                        totalValueSum+= monthlyValueAverageArray[l];
                        totalDurationSum+= monthlyTimeAverageArray[l];
                    }
                    stat.stat1 = Math.round(totalValueSum/(Math.ceil(days/30))).toFixed(1);
                    stat.stat2 = Math.round(totalDurationSum/(Math.ceil(days/30))).toFixed(1);
                }
                exercise.push(stat);
                }
                return exercise; 
        }
        else if(timeline==="yearly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                let historyArray = activity.history;
                stat.stat1 = 0;
                stat.stat2 = 0;
                stat.stat1Unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                stat.stat2Unit = activity.preferredTimeUnit?activity.preferredTimeUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let years = Math.ceil(days/365);
                    let yearlyValueAverageArray = [];
                    let yearlyTimeAverageArray = [];
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(years>0){
                        let history = historyArray[historyCount];
                        let yearlyTotalValue = 0;
                        let yearlyTotalTime = 0;
                        let startDate = DateUtils.getLastYear(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (years===1 && history.dateTime>=startDate)){
                                yearlyTotalValue+=history.totalValue;
                                yearlyTotalTime+= history.totalDuration;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                        yearlyValueAverageArray.push(yearlyTotalValue);
                        yearlyTimeAverageArray.push(yearlyTotalTime);
                        years--;
                    }
                    let totalValueSum = 0;
                    let totalDurationSum =0;
                    for(let l=0; l< yearlyValueAverageArray.length; l++){
                        totalValueSum+= yearlyValueAverageArray[l];
                        totalDurationSum+= yearlyTimeAverageArray[l];
                    }
                    stat.stat1 = Math.round(totalValueSum/(Math.ceil(days/365))).toFixed(1);
                    stat.stat2 = Math.round(totalDurationSum/(Math.ceil(days/365))).toFixed(1);
                }
                exercise.push(stat);
                }
                return exercise; 
        }
    } catch (error) {
        console.log("error in getExerciseStats",error);
        throw error;
    }
}

export const getLeaderBoardStats = async (uuid, timeline) => {
    try {
        const activities = await userActivityService.getAllActivitiesForUser(uuid);
        let exercise = await getMaxStats(activities, timeline);
        return exercise;
    } catch (error) {
        console.log("error in getLeaderBoardStats",error);
        throw error;
    }
}

export const getHealthStats = async (uuid, timeline) => {
    try {
        //ToDo: make this healthService
        const activities = await userHealthService.getAllHealthActivitiesForUser(uuid);
        let health = await getHealthArray(activities, timeline);
        return health;
        
    } catch (error) {
        console.log("error in getHealthStats",error);
        throw error;
    }
}

const getMaxStats = (activities, timeline) =>{
    try {
        let exercise = [];
        if(timeline==="daily"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                stat.action= activity.actionText;
                stat.value = 0;
                stat.unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                if(activity.history.length>0){
                    let history = activity.history;
                    let dailyValueStats=[];
                    let dailyTimeStats=[];

                    const days = DateUtils.getDays(activity.activityStartDate, new Date());
                    for(let j=0; j<history.length; j++){
                        let tempHistory = history[j];
                        dailyValueStats.push(tempHistory.totalValue);
                        dailyTimeStats.push(tempHistory.totalDuration);
                    }
                    dailyTimeStats= dailyTimeStats.sort(function(a, b){return a-b});
                    dailyValueStats = dailyValueStats.sort(function(a, b){return a-b});
                    stat.value = Math.round(dailyValueStats[dailyValueStats.length-1]).toFixed(1);
                }
                exercise.push(stat);
            }
            return exercise;
        }
        else if(timeline==="weekly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                //TODO change to actual id's
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                stat.value = 0;
                stat.action= activity.actionText;
                stat.unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let weeks = Math.ceil(days/7);
                    let weeklyValueAverageArray = [];
                    let weeklyTimeAverageArray = [];
                    let historyArray = activity.history;
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(weeks>0){
                        let history = historyArray[historyCount];
                        let weeklyTotalValue = 0;
                        let weeklyTotalTime = 0;
                        let startDate = DateUtils.getLastWeek(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (weeks===1 && history.dateTime>=startDate)){
                                weeklyTotalValue+=history.totalValue;
                                weeklyTotalTime+= history.totalDuration;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                                weeklyValueAverageArray.push(weeklyTotalValue);
                                weeklyTimeAverageArray.push(weeklyTotalTime);
                        weeks--;
                    }
                   
                    weeklyTimeAverageArray= weeklyTimeAverageArray.sort(function(a, b){return a-b});
                    weeklyValueAverageArray = weeklyValueAverageArray.sort(function(a, b){return a-b});
                    stat.value = Math.round(weeklyValueAverageArray[weeklyValueAverageArray.length-1]).toFixed(1);
                    stat.action= activity.actionText;
                }
                exercise.push(stat);
                }
               
            return exercise; 
        }
        else if(timeline==="monthly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                //TODO change to actual id's
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                let historyArray = activity.history;
                stat.value = 0;
                stat.action= activity.actionText;
                stat.unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let months = Math.ceil(days/30);
                    let monthlyValueAverageArray = [];
                    let monthlyTimeAverageArray = [];
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(months>0){
                        let history = historyArray[historyCount];
                        let monthlyTotalValue = 0;
                        let monthlyTotalTime = 0;
                        let startDate = DateUtils.getLastMonth(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (months===1 && history.dateTime>=startDate)){
                                monthlyTotalValue+=history.totalValue;
                                monthlyTotalTime+= history.totalDuration;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                        monthlyValueAverageArray.push(monthlyTotalValue);
                        monthlyTimeAverageArray.push(monthlyTotalTime);
                        months--;
                    }
                    monthlyTimeAverageArray= monthlyTimeAverageArray.sort(function(a, b){return a-b});
                    monthlyValueAverageArray = monthlyValueAverageArray.sort(function(a, b){return a-b});
                    stat.value = Math.round(monthlyValueAverageArray[monthlyValueAverageArray.length-1]).toFixed(1);
                    stat.unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                    stat.action= activity.actionText;

                }
                exercise.push(stat);
                }
                return exercise; 
        }
        else if(timeline==="yearly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                //TODO change to actual id's
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                let historyArray = activity.history;
                stat.value = 0;
                stat.action= activity.actionText;
                stat.unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let years = Math.ceil(days/365);
                    let yearlyValueAverageArray = [];
                    let yearlyTimeAverageArray = [];
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(years>0){
                        let history = historyArray[historyCount];
                        let yearlyTotalValue = 0;
                        let yearlyTotalTime = 0;
                        let startDate = DateUtils.getLastYear(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (years===1 && history.dateTime>=startDate)){
                                yearlyTotalValue+=history.totalValue;
                                yearlyTotalTime+= history.totalDuration;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                        yearlyValueAverageArray.push(yearlyTotalValue);
                        yearlyTimeAverageArray.push(yearlyTotalTime);
                        years--;
                    }
                    yearlyTimeAverageArray= yearlyTimeAverageArray.sort(function(a, b){return a-b});
                    yearlyValueAverageArray = yearlyValueAverageArray.sort(function(a, b){return a-b});
                    stat.value = Math.round(yearlyValueAverageArray[yearlyValueAverageArray.length-1]).toFixed(1);
                    stat.unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                    stat.action= activity.actionText;
                }
                exercise.push(stat);
                }
                return exercise; 
        }
    } catch (error) {
        console.log("error in getAverageArray",error);
        throw error;
    }
}

export const getHealthArray =(activities, timeline)=>{
    try {
        let exercise = [];
        if(timeline==="daily"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                let statsTotal = 0;
                stat.stat1 = statsTotal;
                stat.stat1Unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                if(activity.history.length>0){
                    let history = activity.history;
                    const days = DateUtils.getDays(activity.activityStartDate, new Date());
                    for(let j=0; j<history.length; j++){
                        let tempHistory = history[j];
                        statsTotal+= tempHistory.totalValue;
                    }
                    stat.stat1 = Math.round(statsTotal/days).toFixed(1);
                }
                exercise.push(stat);
            }
            return exercise;
        }
        else if(timeline==="weekly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                stat.stat1 = 0;
                stat.stat1Unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let weeks = Math.ceil(days/7);
                    let weeklyValueAverageArray = [];
                    let weeklyTimeAverageArray = [];
                    let historyArray = activity.history;
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(weeks>0){
                        let history = historyArray[historyCount];
                        let weeklyTotalValue = 0;
                        let weeklyTotalTime = 0;
                        let startDate = DateUtils.getLastWeek(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (weeks===1 && history.dateTime>=startDate)){
                                weeklyTotalValue+=history.totalValue;
                                weeklyTotalTime+= history.totalDuration;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                                weeklyValueAverageArray.push(weeklyTotalValue);
                                weeklyTimeAverageArray.push(weeklyTotalTime);
                        weeks--;
                    }
                    let totalValueSum = 0;
                    for(let l=0; l< weeklyValueAverageArray.length; l++){
                        totalValueSum+= weeklyValueAverageArray[l];
                    }
                    stat.stat1 = Math.round(totalValueSum/(Math.ceil(days/7))).toFixed(1);
                }
                exercise.push(stat);
                }
               
            return exercise; 
        }
        else if(timeline==="monthly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                let historyArray = activity.history;
                stat.stat1 = 0;
                stat.stat1Unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let months = Math.ceil(days/30);
                    let monthlyValueAverageArray = [];
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(months>0){
                        let history = historyArray[historyCount];
                        let monthlyTotalValue = 0;
                        let startDate = DateUtils.getLastMonth(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (months===1 && history.dateTime>=startDate)){
                                monthlyTotalValue+=history.totalValue;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                        monthlyValueAverageArray.push(monthlyTotalValue);
                        months--;
                    }
                    let totalValueSum = 0;
                    for(let l=0; l< monthlyValueAverageArray.length; l++){
                        totalValueSum+= monthlyValueAverageArray[l];
                    }
                    stat.stat1 = Math.round(totalValueSum/(Math.ceil(days/30))).toFixed(1);
                }
                exercise.push(stat);
                }
                return exercise; 
        }
        else if(timeline==="yearly"){
            for(let i=0; i<activities.length; i++)
            {
                let activity = activities[i];
                let stat = {};
                stat.activityId = activity.activityMasterId?activity.activityMasterId:"1";
                stat.userActivityId = activity.userActivityId?activity.userActivityId:"1";
                let historyArray = activity.history;
                stat.stat1 = 0;
                stat.stat1Unit = activity.preferredValueUnit?activity.preferredValueUnit:"";
                if(activity.history.length>0){
                    const days = DateUtils.getDays(activity.activityStartDate, activity.history[activity.history.length-1].dateTime);
                    let years = Math.ceil(days/365);
                    let yearlyValueAverageArray = [];
                    let historyCount = historyArray.length-1;
                    let endDate = historyArray[historyCount].dateTime;
                    while(years>0){
                        let history = historyArray[historyCount];
                        let yearlyTotalValue = 0;
                        let startDate = DateUtils.getLastYear(endDate);
                        for(let k = historyCount; k>=0; k--){
                            history = historyArray[k];
                            if(history.dateTime<=endDate && history.dateTime>startDate || (years===1 && history.dateTime>=startDate)){
                                yearlyTotalValue+=history.totalValue;
                                historyCount--;
                            }
                            else{
                                endDate=startDate;
                                break;
                            }
                        }
                        yearlyValueAverageArray.push(yearlyTotalValue);
                        years--;
                    }
                    let totalValueSum = 0;
                    let totalDurationSum =0;
                    for(let l=0; l< yearlyValueAverageArray.length; l++){
                        totalValueSum+= yearlyValueAverageArray[l];
                        totalDurationSum+= yearlyTimeAverageArray[l];
                    }
                    stat.stat1 = Math.round(totalValueSum/(Math.ceil(days/365))).toFixed(1);
                }
                exercise.push(stat);
                }
                return exercise; 
        }
    } catch (error) {
        
    }
}
