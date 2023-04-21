import {healthMasterData} from './../services/index.js';
import {httpUtils} from './../utils/index.js'


export const post = async (request, response) => {
    try {
        const payload = request.body;
        const health = await healthMasterData.save(payload);
        httpUtils.setSuccessResponse(health,response);
    } catch (error) {
        httpUtils.setErrorResponse(error,response);
    }

}

export const getOneHealth = async (request, response) => {
    try{ 

        const id = request.params.activityId;
        const health = await healthMasterData.getOneHealth(id);
        httpUtils.setSuccessResponse(health,response);

    } catch(error) {

        httpUtils.setErrorResponse(error,response);

    }

}

export const getAllHealthActivities = async (request, response) => {
    try{ 

        const health = await healthMasterData.getAllHealthActivities();
        httpUtils.setSuccessResponse(health,response);

    } catch(error) {

        httpUtils.setErrorResponse(error,response);

    }

}

export const update = async (request, response) => {
    try{ 

        const id = request.params.activityId;
        const updated = {...request.body};
        updated.activityId = id;
        const health = await healthMasterData.update(updated);
        httpUtils.setSuccessResponse(health,response);

    } catch(error) {
  
        httpUtils.setErrorResponse(error,response);
    }
    
}

export const remove = async (request, response) => {
    try{ 
        
        const id = request.params.activityId;
        const health = await healthMasterData.remove(id);
        httpUtils.setSuccessResponse({message: `Successfully Removed ${id}`},response);


    } catch(error) {

        httpUtils.setErrorResponse(error,response);
        
    }
}

export const getAllRemainingHealthActivitiesForUser = async (request, response) => {
    try{ 
        const uuid = request.params.uuid;
        const health = await healthMasterData.getAllRemainingActivitiesForUser(uuid);
        httpUtils.setSuccessResponse(health,response);


    } catch(error) {

        httpUtils.setErrorResponse(error,response);
        
    }
}