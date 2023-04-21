import { EventsActionTypes } from "../Actions/EventsAction.js"


const getInitialState = () => {
    return {
        eventsData: {},
        savedEvents: [],
    };
  }

const EventsReducer = (state = getInitialState(), action) => {
    const type = action.type
    switch(type) {
        case EventsActionTypes.SET_EVENTS_DATA:
            return {
              ...state,
              eventsData: action.payload
            };
        case EventsActionTypes.SET_SAVED_EVENTS:
                return {
                  ...state,
                  savedEvents: action.payload
                };

        default:
            return state
    }
}

export default EventsReducer;