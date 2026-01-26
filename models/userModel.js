const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:['User name is required']
    },
    email:{
        type:String,
        required:['User email is required']
    },
    password:{
        type:Number,
        required:['User password is required']
    },
},{timestamps:true})
const User = mongoose.model('User',userSchema)
module.exports = User