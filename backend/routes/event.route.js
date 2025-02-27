import express from 'express'
import { addNewEvent, getAllEvents,getEventDetail,deleteEvent,editEvent } from '../controllers/event.controller.js'
const router = express.Router()

router.post('/newEvent',addNewEvent)
router.get('/getAllEvents',getAllEvents)
router.get('/:id',getEventDetail)
router.delete('/:id/delete', deleteEvent)
router.patch('/:id/edit', editEvent)

export default router
