const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected: ${res.connection.host} ${res.connection.name}`)
    } catch (error) {
        
    }
}
module.exports = connectDB