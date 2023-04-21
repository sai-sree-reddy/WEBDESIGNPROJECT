import { JournalActionTypes } from "../Actions/JournalAction.js"


const getInitialState = () => {
    return {
        externalFoodData: {},
        setActivityMasterData: [],
        setFavoriteActivityData: [],
        healthData:[],
    };
  }

const EventsReducer = (state = getInitialState(), action) => {
    const type = action.type
    switch(type) {
        case JournalActionTypes.SET_FOOD_DATA:
            return {
              ...state,
              externalFoodData: action.payload
            };
        case JournalActionTypes.SAVE_SELECTED_FOOD:
                return {
                  ...state,
                  saveSelectedFood: action.payload
                };
        case JournalActionTypes.SET_ACTIVITY_MASTER_DATA:
                return {
                  ...state,
                  setActivityMasterData: action.payload
                };
        case JournalActionTypes.SET_USER_FAVORITE_ACTIVITIES:
          return {
            ...state,
            setFavoriteActivityData: action.payload
          };
        case JournalActionTypes.SET_HEALTH_DATA:
          return {
            ...state,
            healthData: action.payload
          };

        default:
            return state
    }
}

export default EventsReducer;