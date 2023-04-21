import mongoose from "mongoose";

// This model is to add new event data in the database
const eventSchema = new mongoose.Schema({

    eventDate: {
        type: String,
        required: "eventDate is required",

    },

    eventName: {
        type: String,
        required: "event name is required",
    },

    eventId: {
        type: String,
        required: "eventId is required",
    },

    userUUID: {
        type: String,
        required:true
    },

    eventTime: {
        type: String,
        required: "Event Time is required"
    }

})

const model = mongoose.model('eventMasterData', eventSchema);
export default model;


