import Health from '../models/userHealth.js';
import * as healthMasterDataService from '../services/healthMasterData-service.js';


export const getOneHealth = async (id) => {
    const health = await Health.findOne({userActivityId:id}).exec();
    return health;
}

export const getAllHealthActivities = async (uuid) => {
    const healthActivities = await Health.find({userUUID:uuid});
    return healthActivities;
}


export const update = async (activityId, updatedActivity) => {
    let updatedAct = {...updatedActivity};
    updatedAct.lastModifiedDate = new Date();
    const health = await Health.findOneAndUpdate({userActivityId:activityId, userUUID: updatedActivity.userUUID}, updatedAct,{returnDocument:"after"});
    const healthActs = await getAllHealthActivities(updatedActivity.userUUID);
    return healthActs;
}

export const save = async (newHealth) => {
    try { 
        let newAct = {...newHealth};
        newAct.userActivityId = await getLatestHealthId();
        const health = await new Health(newAct).save();
        const healthActivities = await Health.find({userUUID: health.userUUID});
        return healthActivities;
    }
    catch (error){
        throw error;
    }
}


export const remove = async (userId, id) => {
    const health = await Health.findOneAndDelete({userUUID:userId, userActivityId:id}).exec();
    const healthActivities = await Health.find({userUUID:userId});
    return healthActivities;

}

export const getAllHealthActivitiesForUser = async (uuid) => {
    const healthActivities = await Health.find({userUUID:uuid});
    return healthActivities;
}

export const getAllHealthIdsForUser = async (uuid) => {
    const healthActivities = await Health.find({userUUID: uuid}, {activityMasterId:1,_id:0});
    let arr = [];
    for(let i = 0; i< healthActivities.length; i++){
        arr.push(healthActivities[i].activityMasterId)
    }
    return arr;
}

// export const getLatestHealthId = async ()=>{
//     try {
//         let activity = await Activity.find().sort({_id:-1}).limit(1);
//         return (activity.userActivityId+1);
//     } catch (error) {
//         throw error
//     }
    
// }

export const getLatestHealthId = async ()=>{
    try {
    let activity = await Health.find({}).sort({_id:-1}).limit(1);
    
    if(activity[0]&&activity[0].userActivityId) {
        return (activity[0].userActivityId+1);
    }
    else {
        return 1;
    }
    } catch (error) {
        throw error
    }
    
}

export const addDefaultHealthForUser = async (uuid)=>{
    try {
        let healthMaster = await healthMasterDataService.getAllHealthActivities();
        for(let i = 0; i < healthMaster.length; i++) {
            let HealthData = { 
                name: healthMaster[i].name,
                preferredValueUnit: healthMaster[i].preferredValueUnit,
                actionText: healthMaster[i].actionText,
                activityMasterId: healthMaster[i].activityId,
                userUUID: uuid,
                totalValue: 0,
            }
            await save(HealthData);
        }
        return true;
    } catch (error) {
        return false;
    }
}

