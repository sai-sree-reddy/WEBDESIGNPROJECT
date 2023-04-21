import {activityMasterData} from './../services/index.js';
import {httpUtils} from './../utils/index.js'


export const post = async (request, response) => {
    try {
        const payload = request.body;
        const activity = await activityMasterData.save(payload);
        httpUtils.setSuccessResponse(activity,response);
    } catch (error) {
        httpUtils.setErrorResponse(error,response);
    }

}

export const getOneActivity = async (request, response) => {
    try{ 

        const id = request.params.activityId;
        const activity = await activityMasterData.getOneActivity(id);
        httpUtils.setSuccessResponse(activity,response);

    } catch(error) {

        httpUtils.setErrorResponse(error,response);

    }

}

export const getAllActivities = async (request, response) => {
    try{ 

        const activity = await activityMasterData.getAllActivities();
        httpUtils.setSuccessResponse(activity,response);

    } catch(error) {

        httpUtils.setErrorResponse(error,response);

    }

}

export const update = async (request, response) => {
    try{ 

        const id = request.params.activityId;
        const updated = {...request.body};
        updated.activityId = id;
        const activity = await activityMasterData.update(updated);
        httpUtils.setSuccessResponse(activity,response);

    } catch(error) {
  
        httpUtils.setErrorResponse(error,response);
    }
    
}

export const remove = async (request, response) => {
    try{ 
        
        const id = request.params.activityId;
        const activity = await activityMasterData.remove(id);
        httpUtils.setSuccessResponse({message: `Successfully Removed ${id}`},response);


    } catch(error) {

        httpUtils.setErrorResponse(error,response);
        
    }
}

export const getAllRemainingActivitiesForUser = async (request, response) => {
    try{ 
        const uuid = request.params.uuid;
        const activity = await activityMasterData.getAllRemainingActivitiesForUser(uuid);
        httpUtils.setSuccessResponse(activity,response);


    } catch(error) {

        httpUtils.setErrorResponse(error,response);
        
    }
}