import express from "express"
import dotenv from "dotenv"
import eventRouter from './routes/event.route.js'
import mongoose from "mongoose"
const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()

mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log("Connected to DB")
})
.catch((err)=>{
    console.log('err',err)
})

app.use(express.json())
app.use('/event',eventRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({message})
})

app.listen(PORT,()=>{
    console.log(`app is listening at port ${process.env.PORT}`)
})