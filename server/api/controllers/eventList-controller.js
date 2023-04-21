import { eventData } from './../services/index.js';
import { httpUtils } from './../utils/index.js'
import axios from 'axios'

export const postEventTime = async (request, response) => {
    try {
        const payload = request.body;
        const event = await eventData.saveEventData(payload);
        httpUtils.setSuccessResponse(event,response);
    } catch (error) {
        httpUtils.setErrorResponse(error,response);
    }

}

export const getAllEventsData = async (request, response) => {
    try{ 
        const inputText = request.query.inputText;
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=euV5a4ABIaiEzzLNWB89cUfz1llz28YI&keyword=${inputText}`)
        .then(res => {
            httpUtils.setSuccessResponse(res.data, response);
        })
        .catch(error => {
            httpUtils.setErrorResponse(error,response);
            console.log(error, "error");
        });
    
    } catch(error) {
        httpUtils.setErrorResponse(error,response);
    }

}

export const getAllSavedEvents = async (request, response) => {
    try{ 
        const uuid = request.params.uuid
        const event = await eventData.getAllSavedEvents(uuid);
        httpUtils.setSuccessResponse(event, response);
    } catch(error) {
        console.log("error ",error);
        httpUtils.setErrorResponse(error,response);
    }

}

export const unsubscribeEvent = async (request, response) => {
    try{ 
        const uuid = request.params.uuid;
        const eventId = request.params.eventId;
        const event = await eventData.unsubscribeEvent(uuid, eventId);
        httpUtils.setSuccessResponse(event, response);
    } catch(error) {
        console.log("error ",error);
        httpUtils.setErrorResponse(error,response);
    }

}