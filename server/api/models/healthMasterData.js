import mongoose from "mongoose";

// This model is to create an activity in the healthMasterData database
const healthSchema = new mongoose.Schema({

    activityId: {
        type: Number,
        required: "Activity ID is required",

    },

    name:{
        type: String,
        required: "health activity name is required",
    },

    preferredValueUnit: {
        type: String,
        required: "value unit for health is required"
    },

    actionText:{
        type: String,
        default: "slept"
    }

})

const model = mongoose.model('healthMasterData', healthSchema);
export default model;


