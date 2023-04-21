import express from "express";
import * as eventsData from '../controllers/eventList-controller.js';

const router = express.Router();

router.route('/saveEvent')
    .post(eventsData.postEventTime)

router.route('/eventsData')
    .get(eventsData.getAllEventsData)
    
router.route('/getAllSavedEvents/:uuid')
    .get(eventsData.getAllSavedEvents)

router.route('/getAllSavedEvents/:uuid/:eventId')
.delete(eventsData.unsubscribeEvent)

export default router;