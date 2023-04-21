import userRouter from './user-route.js';
import activityMasterData from './activityMasterData-route.js';
import userActivity from './userActivity-route.js';
import eventsData from './events-route.js';
import dashboardRouter from './dashboard-routes.js';
import userHealth from './userHealth-route.js';
import healthMasterData from './healthMasterData-route.js';

export default (app) =>{
    app.use('/',userRouter),
    app.use('/',activityMasterData)
    app.use('/',userActivity)
    app.use('/',eventsData)
    app.use('/',dashboardRouter)
    app.use('/',userHealth)
    app.use('/',healthMasterData)
}