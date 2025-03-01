import express from 'express'
import { addNewEvent, getAllEvents,getEventDetail,deleteEvent,editEvent } from '../controllers/event.controller.js'
import { checkAuth } from '../utils/auth.js'
const router = express.Router()

router.get('/getAllEvents',getAllEvents)
router.get('/:id',getEventDetail)
router.use(checkAuth)
router.post('/newEvent',addNewEvent)
router.delete('/:id/delete', deleteEvent)
router.patch('/:id/edit', editEvent)

export default router
