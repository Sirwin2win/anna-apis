const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.protect = async(req,res,next)=>{
    // const name = "John Doe"
    let token;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }
        if(!token){
            return res.status(401).json({message:"No authorization, no token"})
        }
        // verify the token
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        // attache user to request object
        req.user = await User.findById(decoded.id).select("-password")
        if(!req.user){
            return res.status(401).json({message:"User no longer exist"})
        }
        next()
    } catch (error) {
        res.send("Not authorized, token failed")
    }
}