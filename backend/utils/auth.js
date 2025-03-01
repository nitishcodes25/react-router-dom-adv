import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const isValidEmail = (email) => {
    if(email){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email)
    }
    else{
        return false
    }
}

export const isValidPassword = (password) => {
    if(password){
       return password.trim().length >= 6
    }
    else{
        return false
    }
}

export const checkAuth = (req,res,next) => {
    if(req.method === "OPTIONS"){
        return next()
    }
    if(!req.headers.authorization){
        throw next(errorHandler(400,"Not authenticated1"))
    }

    const authorizationArray = req.headers.authorization.split(' ')
    if(authorizationArray.length !== 2){
        throw next(errorHandler(400,"Not authenticated2"))
    }

    const token = authorizationArray[1]

    try{
        const payload = jwt.verify(token,process.env.SECRET_KEY)
        req.token = payload
    }
    catch(err){
        throw next(errorHandler("401", "Token error"))
    }
    next()
}