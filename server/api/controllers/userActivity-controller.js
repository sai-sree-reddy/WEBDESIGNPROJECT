
import {userActivity} from './../services/index.js';
import {httpUtils} from './../utils/index.js'


export const getOneActivity = async (request, response) => {
    try{ 
        const id = request.params.userActivityId;

        const activity = await userActivity.getOneActivity(id);
        httpUtils.setSuccessResponse(activity,response);

    } catch(error) {

        httpUtils.setErrorResponse(error,response);

    }

}

export const getAllActivities = async (request, response) => {
    try{ 
        const uuid = request.params.uuid
        const activity = await userActivity.getAllActivities(uuid);
        httpUtils.setSuccessResponse(activity,response);
    } catch(error) {
        console.log("error in getAll",error)
        httpUtils.setErrorResponse(error,response);

    }

}

export const updateActivity = async (request, response) => {
    
    try{
    const id = request.params.userActivityId;
    let updatedActivity = {...request.body};
    updatedActivity.lastModifiedDate = new Date();
    const activity = await userActivity.update(id,updatedActivity);
    httpUtils.setSuccessResponse(activity,response);
    }
    catch (error) {
        console.log(error);
        httpUtils.setErrorResponse(error,response);
    }
}

export const remove = async (request, response) => {
    try{ 
        const userId = request.params.uuid; 
        const activityId = request.params.userActivityId;
        const activity = await userActivity.remove(userId, activityId);
        httpUtils.setSuccessResponse({message: `Successfully Removed ${id}`},response);


    } catch(error) {

        httpUtils.setErrorResponse(error,response);
        
    }
}

export const post = async (request, response) => {
    try{
        const activityDetails = request.body;
        const activity = await userActivity.save(activityDetails);
        httpUtils.setSuccessResponse(activity, response);
    }
    catch (error) {
        httpUtils.setErrorResponse(error,response);
    }


}