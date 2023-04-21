import Health from '../models/healthMasterData.js';
import * as userHealthService from './userHealth-service.js'

export const save = async (health) =>{
    const newHealth = await new Health(health);
    return newHealth.save();
}

export const getOneHealth = async (id) => {
    const health = await Health.findOne({activityId:id}).exec();
    return health;
}

export const getAllHealthActivities = async () => {

    const healthActivities = await Health.find()
    return healthActivities;
}

export const update = async (updatedActivity) => {
    const health = await Health.findOneAndUpdate({activityId:updatedActivity.activityId}, updatedActivity);
    return health;
}

export const remove = async (id) => {
    const health = await Health.findOneAndDelete({activityId:id}).exec();
    return health

}

export const getAllRemainingActivitiesForUser = async (uuid) => {
    try {
    let existingActivities = await userHealthService.getAllHealthIdsForUser(uuid);
    const healthActivities = await Health.find({activityId:{$nin:existingActivities}});
    return healthActivities;
    } catch (error) {
        console.log("error in getRem",error)
    }
    
}

export const getAllHealthMasterDataActivitiesForUser = async (uuid) => {
    try {
    const healthActivities = await Health.find({userUUID: uuid});
    return healthActivities;
    } catch (error) {
        console.log("error in getRem",error)
    }
    
}