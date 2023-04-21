import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HTTP } from "../../HTTP"

export const JournalActionTypes = {
    SET_FOOD_DATA: "SET_FOOD_DATA",
    SAVE_SELECTED_FOOD: "SAVE_SELECTED_FOOD",
    SET_ACTIVITY_MASTER_DATA: "SET_ACTIVITY_MASTER_DATA",
    SET_USER_FAVORITE_ACTIVITIES: "SET_USER_FAVORITE_ACTIVITIES",
    SET_HEALTH_DATA: "SET_HEALTH_DATA"
}

export const setSelectedFood = (payload) => {
    return {
        type: JournalActionTypes.SAVE_SELECTED_FOOD,
        payload
    }
}

export const setActivityMasterData = (payload) => {
    return {
        type: JournalActionTypes.SET_ACTIVITY_MASTER_DATA,
        payload
    }
}
export const setFavoriteActivityData = (payload) => {
    return {
        type: JournalActionTypes.SET_USER_FAVORITE_ACTIVITIES,
        payload
    }
}



export const setAllFoodData = (payload) => {
    return {
        type: JournalActionTypes.SET_FOOD_DATA,
        payload
    }
}

export const saveHealthDetails = (payload) => {
    return async (dispatch, getState) => { 
        try {
            // dispatch(showLoaderAction())
            // const url = `http://localhost:9000/eventsData?inputText=${inputText}`
            // const response = await HTTP.get(url);
            // dispatch(setEventsData(response.data))
        } catch(ex) {
            console.log(ex, "error")
        }
        
    }
}

export const getFoodData = (inputSearchTxt = "egg") => {
    return async (dispatch, getState) => { 
        try {
            const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=84c764d34b9e4868a811fde29fc65ddf&query=${inputSearchTxt}&maxCalories=800`
            const response = await HTTP.get(url);
            dispatch(setAllFoodData(response.data));
        } catch(ex) {
            console.log(ex, "error")
        }  
    }
}

export const getActivityMasterData = (uuid) => {
    return async (dispatch, getState) => { 
        try {
            const url = `http://localhost:9000/remainingMasterData/${uuid}`
            const response = await HTTP.get(url);
            dispatch(setActivityMasterData(response.data));
        } catch(ex) {
            console.log(ex, "error")
        }  
    }
}

export const getHealthData = (uuid) => {
    return async (dispatch, getState) => { 
        try {
            const url = `http://localhost:9000/userhealthData/${uuid}`
            const response = await HTTP.get(url);
            dispatch(setAllHealthData(response.data));
        } catch(ex) {
            console.log(ex, "error")
        }  
    }
}

export const getUserFavoriteActivities = (uuid) => {
    return async (dispatch, getState) => { 
        try {
            const url = `http://localhost:9000/users/${uuid}/useractivity`
            const response = await HTTP.get(url);
            dispatch(setFavoriteActivityData(response.data));
        } catch(ex) {
            console.log(ex, "error")
        }  
    }
}

export const updateActivity = (uuid, userActivityId, newActivity) => {
    return async (dispatch, getState) => { 
        try {
            const url = `http://localhost:9000/users/${uuid}/useractivity/${userActivityId}`
            const response = await HTTP.put(url, newActivity);
            if(response.status===200){
                dispatch(setFavoriteActivityData(response.data));
                toast.success('Your data has been saved successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if(response.status===500){
                toast.error('Your data has not been saved successfully. Try again later', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch(ex) {
            console.log(ex, "error")
        }  
    }
}

export const setAllHealthData = (payload) => {
    return {
        type: JournalActionTypes.SET_HEALTH_DATA,
        payload
    }
}

export const updateHealth =(uuid, userActivityId, newHealth)=>{
    return async (dispatch, getState) => { 
        try {
            const url = `http://localhost:9000/users/${uuid}/userhealth/${userActivityId}`
            const response = await HTTP.put(url, newHealth);
            if(response.status===200){
            dispatch(setAllHealthData(response.data));
                toast.success('Your data has been saved successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if(response.status===500){
                toast.error('Your data has not been saved successfully. Try again later', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch(ex) {
            console.log(ex, "error")
        }  
    }
}
