import mongoose from 'mongoose';

//User Health Schema
const userHealthSchema = new mongoose.Schema({
    userActivityId:{
        type: Number,
        required: "User Health ID is required"
    },
    
    name:{
        type:String,
        required: "Name of Health is required",
    },

    history: { 
    type: [ 
    {"dateTime": Date,
    "totalValue": Number
    } 
    ],
    default:[]
    },
       
    
    totalValue: {
        type: Number,
        required: "Value required"
    },
    userUUID: {
        type: String,
        required:true
    },

    activityStartDate: {
        type: Date,
        default: Date.now
    },

    lastModifiedDate: {
        type: Date,
    },

    actionText: {
        type: String,
        default: "flexed"
    },
    activityMasterId:{
        type:Number,
        required: "activityMasterId is required"
    },
    preferredValueUnit:{
        type: String,
        required: "preferredValueUnit is required"
    }



})



const model = mongoose.model('userHealth', userHealthSchema);
export default model;
