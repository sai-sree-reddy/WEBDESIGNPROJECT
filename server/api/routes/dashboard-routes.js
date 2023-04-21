import express from 'express';
import * as dashboardController from '../controllers/dashboard-controller.js';

const router = express.Router();

router.route('/dashboard/:userUUID')
.get(dashboardController.get);

export default router;