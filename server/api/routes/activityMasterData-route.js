import express from "express";
import * as activityMasterData from '../controllers/activityMasterData-controller.js';


const router = express.Router();

router.route('/activityMasterData/:activityId')
    .put(activityMasterData.update)
    .delete(activityMasterData.remove)
    .get(activityMasterData.getOneActivity)

router.route('/activityMasterData')
    .post(activityMasterData.post)
    .get(activityMasterData.getAllActivities)

router.route('/remainingMasterData/:uuid')
.get(activityMasterData.getAllRemainingActivitiesForUser)
    

export default router;