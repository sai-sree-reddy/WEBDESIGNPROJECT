import { LoaderActionTypes } from "../Actions/LoaderAction.js"


const getInitialState = () => {
    return {
        showLoader: false
    };
  }

const LoaderReducer = (state = getInitialState(), action) => {
    const type = action.type
    switch(type) {
        case LoaderActionTypes.SET_LOADER:
            return {
              ...state,
              showLoader: action.payload
            };

        default:
            return state
    }
}

export default LoaderReducer;