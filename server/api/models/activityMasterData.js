import mongoose from "mongoose";

// This model is to create an activity in the activityMasterData database
const activitySchema = new mongoose.Schema({

    activityId: {
        type: Number,
        required: "Activity ID is required",

    },

    name:{
        type: String,
        required: "Activity name is required",
    },

    preferredValueUnit:{
        type: String,
        default: 'Miles',
        required: "preferredValueUnit is required"
    },

    preferredTimeUnit: {
        type: String,
        default: "Minutes",
        required: "preferredTimeUnit is required"
    },


    unitOptions:{
        type: [String],
    },

    actionText:{
        type: String,
        default: "flexed"
    }

})

const model = mongoose.model('activityMasterData', activitySchema);
export default model;


