import {userHealth} from './../services/index.js';
import {httpUtils} from './../utils/index.js';


export const getOneHealth = async (request, response) => {
    try{ 
        const id = request.params.userActivityId;

        const health = await userHealth.getOneHealth(id);
        httpUtils.setSuccessResponse(health,response);

    } catch(error) {

        httpUtils.setErrorResponse(error,response);

    }

}

export const getAllHealthActivities = async (request, response) => {
    try{ 
        const uuid = request.params.uuid;
        const health = await userHealth.getAllHealthActivities(uuid);
        httpUtils.setSuccessResponse(health,response);
    } catch(error) {
        console.log("error is ",error)
        httpUtils.setErrorResponse(error,response);

    }

}

export const updateHealth = async (request, response) => {
    
    try{
    const id = request.params.userActivityId;
    const updatedActivity = {...request.body};
    updatedActivity.lastModifiedDate = new Date();
    const health = await userHealth.update(id,updatedActivity);
    httpUtils.setSuccessResponse(health,response);
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
        const health = await userHealth.remove(userId, activityId);
        httpUtils.setSuccessResponse({message: `Successfully Removed ${id}`},response);


    } catch(error) {

        httpUtils.setErrorResponse(error,response);
        
    }
}

export const post = async (request, response) => {
    try{
        const activityDetails = request.body;
        const health = await userHealth.save(activityDetails);
        httpUtils.setSuccessResponse(health, response);
    }
    catch (error) {
        httpUtils.setErrorResponse(error,response);
    }


}