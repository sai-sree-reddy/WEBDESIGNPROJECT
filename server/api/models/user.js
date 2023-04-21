import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Structure of a user in flex-appeal
 */
const Schema = new mongoose.Schema({
    uuid:{
        type: String,
        required: "Username is required",
        unique:true,
    },
    firstName:{
        type: String,
        required:"First Name is required"
    },
    lastName:{
        type: String,
        required: "Last Name is required"
    },
    email:{
        type: String,
        required: "Email is required"
    },
    gender:{
        type: String,
        required: "Gender is required"
    },
    password: {
        type: String,
        required:"Password is required"
    },
    dateOfBirth:{
        type: String,
        required: "Date of birth is required",
    },
    roles:{
        type: Array,
        default:["user"]
    },
    phone: {
        type: String,
        default : ""
    },
    country : {
        type : String,
        default: ""
    },
    feet : {
        type : String,
        default: ""
    },
    inches : {
        type : String,
        default: ""
    },
    weight : {
        type : String,
        default: ""
    },
    profilePicture:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    securityQuestion:{
        type: String,
        required: "Security Question is required"
    },
    securityAnswer:{
        type: String,
        required: "Security Answer is required"
    },
    bio:{
        type : String,
        default : ""
    }
})

/**
 * Pre Trigger to convert user password and security answer to an encrypted hash value before saving
 */
export const encryptField = async(field) => {
    let newHash;
    try{
        newHash = await bcrypt.hash(field, 8); 
    }
    catch(error){
        return error;
    }
    return newHash;
}

Schema.pre("save", function(next){
    
    if(this.isModified("password")){ 
        encryptField(this.password).then((hashedPassword)=>{
            this.password = hashedPassword;
            if (this.isModified("securityAnswer")) {
                encryptField(this.securityAnswer).then((hashedAnswer) => {
                    this.securityAnswer = hashedAnswer;
                    return next();
                })
            }
        })
    }  
})

/*Schema.pre("updateOne", async function(next){
    console.log("inside update one function in user model")
    
    if (this.isModified("password")) {
        encryptField(this.password).then((hashedPassword) => {
            this.password = hashedPassword;
            if (this.isModified("securityAnswer")) {
                encryptField(this.securityAnswer).then((hashedAnswer) => {
                    this.securityAnswer = hashedAnswer;
                    return next();
                })
            }
        })
    }
})*/

/**
 * Function to compare the user input password with what is stored in db
 * @param {*} password 
 * @returns boolean value of whether user entered and user stored passwords match
 */
Schema.methods.comparePwd =  function (password){
    if(!password){
        throw new Error("Password is missing.");
    }
    else{
        const res =  bcrypt.compare(password, this.password);
        return res;
    }
}

/**
 * Function to compare the user input security answer with what is stored in db
 * @param {*} answer 
 * @returns boolean value of whether user entered and user security answers match
 */

Schema.methods.compareSecAns =  function (answer){
    if(!answer){
        throw new Error("Security answer is missing.");
    }
    else{
        const res =  bcrypt.compare(answer, this.securityAnswer);
        return res;
    }
}

Schema.methods.compareSecQuestion =  function (question){
    if(!question){
        throw new Error("Security question is missing.");
    }
    else{
        return (this.securityQuestion === question);
    }
}

const model = mongoose.model('user', Schema);
export default model;