const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    // getting the form details from the request body
    const {name,email,password} = req.body
    // hashing the password with bcrypt js
    const hashedPassword = await bcrypt.hash(password,10)
try {
        // new user instance
    const user = new User({
        name:name,
        email:email,
        password:hashedPassword
    })
    // Checking if there's a user with this email
    const userExists = await User.findOne({email})
    if(userExists){
       return res.send(`User with email:${email}, already exists`);
        
    }else{
        const newUser = await user.save()
        if(!newUser){
          return res.send("Could not create user")
        }
        res.send(newUser)
    }
} catch (error) {
    res.send(error.message)
}

}
// Login logic
exports.login = async(req,res)=>{
    const {email,password} = req.body
    // checking if the user exists
    const isUser = await User.findOne({email})
    if(!isUser){
     return res.send("User does not exist")
    }
    /*
    const isUser = {
        _id:"6979d4570b72ceedabcfc57c"
name:"John Doe"
email:"johndoe@gmail.com"
password:"$2b$10$3azj1zs2/Nz.MrxCk2PmtuJYhdOQ4/ufxrzsMZEjxMwFdsqfCQATa"
createdAt:2026-01-28T09:18:21.733+00:00
updatedAt:2026-01-28T09:18:21.733+00:00
    }


    */
    try {
        let token = await jwt.sign({id:isUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        if(isUser && (await bcrypt.compare(password,isUser.password))){
            res.json({
                isUser,
                token
            })
        }else{
            res.send("Invalid password")
        }
    } catch (error) {
        res.send(error.message)
    }
}

// get all users logic
exports.getUsers = async(req,res)=>{
    try {
        const users = await User.find()
        if(!users){
            res.send("No user found")
        }
        res.send(users)
    } catch (error) {
        res.send(error.message)
    }
}
