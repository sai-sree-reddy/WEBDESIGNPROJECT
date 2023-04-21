import { ActivityActionTypes } from "../Actions/ActivityActions";

const getInitialState = () => {
    return {
       userActivities: []
    };
  }

const ActivityReducer = (state = getInitialState(), action) => {
    const type = action.type
    switch(type) {
        case ActivityActionTypes.FETCH_ACTIVITY_STATS:
            return {
              ...state,
              userActivities: action.payload
            };

        case ActivityActionTypes.POST_ACTIVITY_STATS:
          return {
            ...state,
            userActivities: action.payload
          };

          case ActivityActionTypes.UPDATE_ACTIVITY_STATS:
            return {
              ...state,
            };

        default:
            return state
    }
}

export default ActivityReducer;