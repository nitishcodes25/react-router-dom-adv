import express from 'express'
import { addNewEvent } from '../controllers/event.controller.js'
const router = express.Router()

router.post('/newEvent',addNewEvent)

export default router
