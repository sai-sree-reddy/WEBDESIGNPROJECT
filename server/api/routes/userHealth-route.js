import express from "express";
import * as userHealth from '../controllers/userHealth-controller.js';

const router = express.Router();

router.route('/userhealth/:userActivityId')
    .put(userHealth.updateHealth)
    .delete(userHealth.remove)
    .get(userHealth.getOneHealth)

router.route('/userhealthData/:uuid')
    .get(userHealth.getAllHealthActivities)
    .post(userHealth.post)

router.route('/users/:uuid/userhealth/:userActivityId')
    .put(userHealth.updateHealth)
    .delete(userHealth.remove)
    

export default router;