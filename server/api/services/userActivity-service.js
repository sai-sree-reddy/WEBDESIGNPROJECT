import Activity from '../models/userActivity.js';


export const getOneActivity = async (id) => {
    const activity = await Activity.findOne({userActivityId:id}).exec();
    return activity;
}

export const getAllActivities = async (uuid) => {

    const activities = await Activity.find({userUUID:uuid});
    return activities;
}


export const update = async (activityId, updatedActivity) => {
    const activity = await Activity.findOneAndUpdate({userActivityId:activityId, userUUID: updatedActivity.userUUID}, updatedActivity,{returnDocument:"after"})
    const activities = await getAllActivities(updatedActivity.userUUID);
    return activities;
}

export const save = async (newActivity) => {
    try{ 
    let newAct = {...newActivity};
    newAct.userActivityId = await getLatestActivityId();
    const activity = await new Activity(newAct).save();
    const activities = await Activity.find({userUUID: activity.userUUID});
    return activities;
    }
    catch (error){
        console.log("error ",error)
        throw error;
    }


}

export const getLatestActivityId = async ()=>{
    try {
        let activity = await Activity.find({}).sort({_id:-1}).limit(1);
        if(activity[0]&&activity[0].userActivityId){

            return (activity[0].userActivityId+1);
        }
        else{
            return 1;
        }
    } catch (error) {
        throw error
    }
}


// export const saveActivityToHistory = async (newActivity) => {

//     const updateHistory = {
//         $push: {"newHistory.$.userActivityId": newActivity.userActivityId,
//                 "newHistory.$.dateTime": newActivity.dateTime,
//                 "newHistory.$.totalValue": newActivity.totalValue,
//                 "newHistory.$.totalDuration": newActivity.totalDuration
//         }
//     }
//     await newHistory.updateOne(updateHistory);
//     return newHistory.save();
// }



export const remove = async (userId, id) => {
    const activity = await Activity.findOneAndDelete({userUUID:userId, userActivityId:id}).exec();
    const activities = await Activity.find({userUUID:userId});
    return activities;

}

export const getAllActivitiesForUser = async (uuid) => {
    const activities = await Activity.find({userUUID:uuid});
    return activities;
}

export const getAllActivityIdsForUser = async (uuid) => {
    const activities = await Activity.find({userUUID: uuid}, {activityMasterId:1,_id:0});
    let arr = [];
    for(let i = 0; i< activities.length; i++){
        arr.push(activities[i].activityMasterId)
    }
    return arr;
}

