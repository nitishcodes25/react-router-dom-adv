import eventModel from "../models/event.model.js"

export const addNewEvent = async(req,res,next) => {
    const {title,image,date,description} =  req.body
    const newEvent = new eventModel({title,image,description,date})
    try{
        const newEventData = await newEvent.save()
        const newDoc = newEventData._doc
        res.status(201).json(newDoc)
    }
    catch(err){
        next(err)
    }
}

export const getAllEvents = async(req,res,next) => {
    try{
        const events = await eventModel.find()
        setTimeout(()=>{
            return res.status(201).json(events)
        },1000)
    }
    catch(err){
        next(err)
    }
}   

export const getEventDetail = async(req,res,next) => {
    const eventId = req.params.id
    try{
        const event = await eventModel.findById(eventId)
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
    
        return res.status(201).json(event)
    }
    catch(err){
        next(err)
    }
}  

export const deleteEvent = async(req,res,next) => {
    const eventId = req.params.id
    try{
        const event = await eventModel.findByIdAndDelete(eventId)
        return res.status(201).json(event)
    }
    catch(err){
        next(err)
    }
}  

export const editEvent = async(req,res,next) => {
    const eventId = req.params.id
    try{
        const updatedEvent = await eventModel.findByIdAndUpdate(eventId,{
            $set: {
                title: req.body.title,
                image: req.body.image,
                date: req.body.date,
                description: req.body.description
            }
        },{new: true})
        return res.status(201).json(updatedEvent._doc)
    }
    catch(err){
        next(err)
    }
} 