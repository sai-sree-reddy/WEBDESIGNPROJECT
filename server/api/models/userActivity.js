import mongoose from 'mongoose';

//User Activity Schema
const userAcivitySchema = new mongoose.Schema({
    userActivityId:{
        type: Number,
        required: "User Activity ID is required"
    },
    
    name:{
        type:String,
        //required: "Name of activity is required",
    },

    history: { 
    type: [ 
    {"dateTime": Date,
    "totalValue": Number,
    "totalDuration": Number} 
    ],
    default:[]
    },
       
    
    totalValue: {
        type: Number,
        required: "Value required"
    },
    unit:{
        type: String,
        //required: "Unit required"
    },

    totalDuration: {
        type: Number,
        //required: "Duration required"
    },

    date: {
        type: Date,
    //equired: "Date is required"
    },

    userUUID: {
        type: String,
        required:true
    },

    activityStartDate: {
        type: Date,
        default: Date.now,
        required: "Activity Start Date is required"
    },

    lastModifiedDate: {
        type: Date,
        //required: "Modified date is required"
    },

    activityMasterId:{
        type: Number,
        required: "Activity master id is required",
    },

    preferredValueUnit: {
        type: String,
        default: "Miles",
        required: "preferredValueUnit is required"
    },

    preferredTimeUnit: {
        type: String,
        default: "Minutes",
        required: "preferredTimeUnit is required"
    },

    actionText: {
        type: String,
        default: "flexed"
    }


})



const model = mongoose.model('userActivity', userAcivitySchema);
export default model;
