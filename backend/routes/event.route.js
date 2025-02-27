import express from 'express'
import { addNewEvent, getAllEvents } from '../controllers/event.controller.js'
const router = express.Router()

router.post('/newEvent',addNewEvent)
router.get('/getAllEvents',getAllEvents)

export default router
