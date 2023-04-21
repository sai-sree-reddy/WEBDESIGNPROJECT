import express from "express";
import * as healthMasterData from '../controllers/healthMasterData-controller.js';


const router = express.Router();

router.route('/healthMasterData/:activityId')
    .put(healthMasterData.update)
    .delete(healthMasterData.remove)
    .get(healthMasterData.getOneHealth)

router.route('/healthMasterData')
    .post(healthMasterData.post)
    .get(healthMasterData.getAllHealthActivities)

router.route('/remainingHealthMasterData/:uuid')
.get(healthMasterData.getAllRemainingHealthActivitiesForUser)
    

export default router;