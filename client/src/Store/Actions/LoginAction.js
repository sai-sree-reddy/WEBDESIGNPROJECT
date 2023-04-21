import { HTTP } from './../../HTTP';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginActionTypes = {
    LOGIN_USER : "[User] logged in user",
    SIGNUP_USER : "[User] signup a user",
    FORGOTPASSWORD_USER : "[User] forgot password",
    VERIFY_USER : "[User] verify user with uuid, security question and answer",
    UPDATE_USER : "[User] update user details"
};

const notify = () => {
    toast.success('Profile Updated Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const SignUpAction = (payload) => {
    return{
        type: LoginActionTypes.SIGNUP_USER, 
        payload : payload
    }
}

const verifyUserAction = (payload) => {
    
    return{
        type: LoginActionTypes.VERIFY_USER, 
        payload : payload
    }
}

const loginAction = (payload) => {
    return {
        type: LoginActionTypes.LOGIN_USER,
        payload: payload
    }
}

const updateUserDetailsAction = (payload, callingComponent) => {
    
    console.log('calling-component---'+callingComponent);
    if(callingComponent === 'UserProfile'){
        notify();
    }
    return {
        type: LoginActionTypes.UPDATE_USER,
        payload: payload
    }
}



/**
 * action method for signing up a user, makes a post request to the server
 * @param {*} payload 
 * @returns 
 */
export const signUpUser = (payload) => {
    
    return async(dispatch) => {
        try{
            const url = 'http://localhost:9000/users';
            const response = await HTTP.post(url,payload)
            dispatch(SignUpAction(response.data));
        }catch(error){
            console.log('error in signUpUser Action :'+error)
        } 
    }
}

export const handleUserVerification = (payload) => {
    
    return async(dispatch) => {
        let username = payload.username;
        const body = {username: username, password : payload.password}
        try{
            const url = 'http://localhost:9000/users/verify-security/'+username+'?securityQuestion='+payload.securityQuestion+'&&securityAnswer='+payload.securityAnswer;
            const response = await HTTP.get(url,body)
            dispatch(verifyUserAction(response.data));
        }catch(error){
            console.log('error in handle user forgot password Action :'+error)
        }
    }
}

/**
 * action method for loginUser, make a get request to the server
 * @param {*} payload 
 * @returns 
 */

export const loginUser = (payload) => {
    return async (dispatch) => {
        let username = payload.username;
        
        try {
            const url = 'http://localhost:9000/users/login/' + username;
            const response = await HTTP.post(url, payload)
            if (response.status === 200) {
                localStorage.setItem("isUserAuthenticated", response.data.authenticated )
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            dispatch(loginAction(response.data));
        }
        catch (error) {
            console.log("error in loginUser action :" + error);
        }
    }
}

/**
 * action method for update user details, make a get request to the server
 * @param {*} payload 
 * @returns 
 */

export const updateUserDetails = (payload, callingComponent) => {
    return async (dispatch) => {
        let username = payload.uuid;
        try {
            const url = 'http://localhost:9000/users/' + username;
            const response = await HTTP.put(url, payload)
      
            if(response.status===200){
                localStorage.setItem("user",JSON.stringify(response.data.user));
            }
          dispatch(updateUserDetailsAction(response.data, callingComponent));
        }
        catch (error) {
            console.log("error in updateUserDetails action :" + error);
        }
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        try {
            localStorage.removeItem("user");
            dispatch(loginAction({authenticated: false, user: null}));
            return true;
        }
        catch (error) {
            console.log("error in loginUser action :" + error);
            return false;
        }
    }
}

export const setUserToStoreOnRefresh = (reduxUser) => {
    return async (dispatch, getState) => {
        try {
            if(localStorage.getItem("user")&&reduxUser===null){
                const user = JSON.parse(localStorage.getItem("user"));
                dispatch(loginAction({authenticated: true, user: user}))
              }
        }
        catch (error) {
            console.log("error in loginUser action :" + error);
            return false;
        }
    }
}


