import express from "express"
import dotenv from "dotenv"
import eventRouter from './routes/event.route.js'
const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()

app.use('/event',eventRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({message})
})

app.listen(PORT,()=>{
    console.log(`app is listening at port ${process.env.PORT}`)
})