import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './Reducers/LoginReducer';
import DashboardReducer from './Reducers/DashboardReducer';
import ActivityReducer from './Reducers/ActivityReducer';
import EventsReducer from './Reducers/EventsReducer';
import LoaderReducer from './Reducers/LoaderReducer';
import JournalReducer from './Reducers/JournalReducer';


const store = configureStore({
  reducer: {
    Login: LoginReducer,
    Dashboard: DashboardReducer,
    Activity: ActivityReducer,
    Events: EventsReducer,
    Loader: LoaderReducer,
    Journal: JournalReducer
  }
})

export default store;