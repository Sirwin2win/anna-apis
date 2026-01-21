const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const produuctRoutes = require('./routes/productRoutes')


const app = express()

connectDB()
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',produuctRoutes)




const port = process.env.PORT || 7000

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})