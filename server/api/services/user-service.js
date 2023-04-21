import User from '../models/user.js';
import * as userHealthService from '../services/userHealth-service.js';



/**
 * Function to add a new user
 * @param {*} newUser 
 * @returns created user object
 */
export const save = async(newUser)=>{
    try {
        const user = new User(newUser);
        let res = await userHealthService.addDefaultHealthForUser(newUser.uuid);
        if(res){
            return user.save();
        }
        else{
            return {};
        }
    } catch(error){
        console.log("error ",error);
        throw error
    }
    
}

/**
 * Checks for user presence and password match
 * @param {*} uuid 
 * @param {*} pwd 
 * @returns status of login and the user
 */
export const login = async (uuid, pwd)=>{
    try {
    const user = await User.findOne({uuid:uuid});
    const res = await user.comparePwd(pwd);
    if(res){
        return { authenticated: res, user: user };
    }else{
        return { authenticated: res, message: 'Incorrect Password!'};
    }
    
    } catch (error) {
        throw error
    }
    
}

/**
 * Service method to compare security answers and return the result
 * @param {*} uuid 
 * @param {*} answer 
 * @returns boolean value of whether the answers match
 */
export const verifySecurityAnswer = async (uuid,question, answer)=>{
    try {
    const user = await User.findOne({uuid:uuid});
    
    if(user !== null){
        const res1 = await user.compareSecQuestion(question);
        const res2 = await user.compareSecAns(answer);
        return (res1 && res2);
    }else{
        return false;
    }
    } catch (error) {
        throw error
    } 
}

/**
 * Service method to check if user is unique in the system
 * @param {*} uuid 
 * @returns boolean value of uniqueness
 */
export const isUnique = async (uuid)=>{
    try {
        const user = await User.findOne({uuid:uuid});
        if(user){
            return false;
        }
        else{
            return true;
        }
    } catch (error) {
        throw error;
    }
}


/**
 * Service method to update a user
 * @param {*} uuid 
 * @param {*} updatedUser 
 * @returns updated user
 */
export const updateUser = async (uuid, updatedUser) =>{
    try {
        const user = await User.findOneAndUpdate({uuid: uuid}, updatedUser , {returnDocument:'after'});
        return user;
    } catch (error) {
        throw error;
    }
}

/**
 * Gets all users of the application
 * @returns all users
 */
export const getUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw error;
    }
}

/**
 * Returns user based on id
 * @param {*} uuid 
 * @returns user
 */
export const getUserById = async (uuid) => {
    try {
        const user = await User.findOne({uuid: uuid});
        return user;
    } catch (error) {
        throw error;
    }
}