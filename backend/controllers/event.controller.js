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