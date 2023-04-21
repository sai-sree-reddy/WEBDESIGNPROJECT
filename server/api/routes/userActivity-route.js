import express from "express";
import * as userActivity from '../controllers/userActivity-controller.js';

const router = express.Router();

router.route('/useractivity/:userActivityId')
    .put(userActivity.updateActivity)
    .delete(userActivity.remove)
    .get(userActivity.getOneActivity)

router.route('/users/:uuid/useractivity')
    .get(userActivity.getAllActivities)
    .post(userActivity.post)

router.route('/users/:uuid/useractivity/:userActivityId')
    .put(userActivity.updateActivity)
    .delete(userActivity.remove)
    

export default router;