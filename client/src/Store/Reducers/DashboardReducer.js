import { DashboardActionTypes } from "../Actions/DashboardAction.js"


const getInitialState = () => {
    return {
      exercise:[],
      health:[],
      leaderboard:[]
    };
  }

const DashboardReducer = (state = getInitialState(), action) => {
    const type = action.type
    switch(type) {
        case DashboardActionTypes.FETCH_USER_DASHBOARD_DETAILS:
            return {
              ...state,
              exercise: action.payload.exercise,
              health: action.payload.health,
              leaderboard: action.payload.leaderboard
            };
        case DashboardActionTypes.FETCH_USER_EXERCISE_DETAILS:
          return {
            ...state,
            exercise: action.payload.exercise,
          };
        case DashboardActionTypes.FETCH_USER_LEADERBOARD_DETAILS:
          return {
            ...state,
            leaderboard: action.payload.leaderboard,
          };
        case DashboardActionTypes.FETCH_USER_HEALTH_DETAILS:
          return {
            ...state,
            leaderboard: action.payload.health,
          };
        default:
            return state
    }
}

export default DashboardReducer;