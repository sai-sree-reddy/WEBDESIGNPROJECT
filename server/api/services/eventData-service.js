import Event from '../models/eventList.js';


export const saveEventData = async (event) =>{
    const newEvent = await new Event(event);
    return newEvent.save();
}

export const getAllSavedEvents = async (userUUID) => {
    const allEvents = await Event.find({userUUID: userUUID});
    return allEvents
}

export const unsubscribeEvent = async (userUUID, eventId) => {
    await Event.findOneAndDelete({userUUID: userUUID, eventId: eventId});
    const allEvents = await Event.find({userUUID: userUUID});
    return allEvents
}