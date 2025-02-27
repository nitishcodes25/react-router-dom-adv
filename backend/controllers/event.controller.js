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
        return res.status(201).json(events)
    }
    catch(err){
        next(err)
    }
}   