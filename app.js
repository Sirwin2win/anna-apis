const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const produuctRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')


const app = express()

connectDB()
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',produuctRoutes)
app.use('/api/auth',userRoutes)




const port = process.env.PORT || 7000

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})