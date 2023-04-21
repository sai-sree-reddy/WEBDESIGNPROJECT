import Activity from '../models/activityMasterData.js';
import * as userActivityService from './userActivity-service.js'

export const save = async (activity) =>{
    const newActivity = await new Activity(activity);
    return newActivity.save();
}

export const getOneActivity = async (id) => {
    const activity = await Activity.findOne({activityId:id}).exec();
    return activity;
}

export const getAllActivities = async () => {

    const activities = await Activity.find()
    return activities;
}

export const update = async (updatedActivity) => {
    const activity = await Activity.findOneAndUpdate({activityId:updatedActivity.activityId}, updatedActivity);
    return activity;
}

export const remove = async (id) => {
    const activity = await Activity.findOneAndDelete({activityId:id}).exec();
    return activity

}

export const getAllRemainingActivitiesForUser = async (uuid) => {
    try {
    let existingActivities = await userActivityService.getAllActivityIdsForUser(uuid);
    const activities = await Activity.find({activityId:{$nin:existingActivities}});
    return activities;
    } catch (error) {
        console.log("error in getRem",error)
    }
    
}