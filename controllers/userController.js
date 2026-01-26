const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

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