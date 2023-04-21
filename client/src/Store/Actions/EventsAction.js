import { HTTP } from "../../HTTP"
import {showLoaderAction, hideLoaderAction} from './LoaderAction.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EventsActionTypes = {
    SET_EVENTS_DATA: "SET_EVENTS_DATA",
    SET_SAVED_EVENTS: "SET_SAVED_EVENTS"
}

export const setEventsData = (payload) => {
    return {
        type: EventsActionTypes.SET_EVENTS_DATA,
        payload
    }
}

export const setSavedEvents = (payload) => {
    return {
        type: EventsActionTypes.SET_SAVED_EVENTS,
        payload
    }
}

export const getEventBriteEvents = (inputText = "boxing") => {
    return async (dispatch, getState) => { 
        try {
            dispatch(showLoaderAction())
            const url = `http://localhost:9000/eventsData?inputText=${inputText}`
            const response = await HTTP.get(url);
            dispatch(setEventsData(response.data))
        } catch(ex) {
            console.log(ex, "error")
        } finally {
            dispatch(hideLoaderAction())
        }
        
    }
}

export const saveInterestedEvent = (payload) => {
    return async (dispatch, getState) => { 
        try {
            dispatch(showLoaderAction())
            const url = `http://localhost:9000/saveEvent`
            const response = await HTTP.post(url, payload);
            if(response.status===200){
                toast.success('Your event has been saved', {
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
                toast.error('Your event could not be added. Try again later', {
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
        } finally {
            dispatch(hideLoaderAction())
        } 
    }
}

export const getAllSavedEvents = (userUUID) => {
    return async (dispatch, getState) => { 
        try {
            const url = `http://localhost:9000/getAllSavedEvents/${userUUID}`
            const response = await HTTP.get(url);
            dispatch(setSavedEvents(response.data));
        } catch(ex) {
            console.log(ex, "error")
        } finally {
            dispatch(hideLoaderAction())
        } 
    }
}

export const unsubscribeEvent = (userUUID, eventId) => {
    return async (dispatch, getState) => { 
        try {
            const url = `http://localhost:9000/getAllSavedEvents/${userUUID}/${eventId}`
            const response = await HTTP.del(url);
            if(response.status===200){
                toast.success(`You have successfully unsubscribed from the event`, {
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
                toast.error('Could not unsubscribe event. Try again later', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            dispatch(setSavedEvents(response.data));
        } catch(ex) {
            console.log(ex, "error")
        } finally {
            dispatch(hideLoaderAction())
        } 
    }
}