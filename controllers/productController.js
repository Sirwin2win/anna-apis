const Product = require('../models/productModel')
const path = require('path')
const fs = require('fs')


// create product on the database
exports.createProduct = async(req,res)=>{
    // destructuring the form information from the req.body
    const {title,description,price,image} = req.body
    // getting the image name from the req.file
    const imageName =  req.file.filename
    // instantiation a new product object for database
    const newProduct = new Product({
        title:title,
        description:description,
        price:price,
        image:imageName
    })
    try {
       // saving the new instance of the product object to the database
       const product = await newProduct.save() 
       if(!product){
        res.status(404).json({message:"Couldn't create product at the moment"})
       }
       res.send(product)
    } catch (error) {
        res.send(error.message)
    }
}

// fetch all the products
exports.getProducts = async(req,res)=>{
    try {
            const products = await Product.find()

        if(!products){
            res.status(404).json({message:'Products not found'})
        }
        res.send(products)
    } catch (error) {
        res.send(error.message)
    }
}
// Fetch Single Product
exports.fetchSingle = async(req,res)=>{
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        if(!product){
            res.send("No product found")
        }
        res.send(product)
    } catch (error) {
        res.send(error.message)
    }
}
// Update product
exports.upadateProduct = async(req,res)=>{
    // destructure the id from the url
    const {id} = req.params
    // destructure the request body info
    console.log(req.body)
    // const {title, description, price, image} = req.body
    try {
        const {title,description,price,image} = req.body
        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({success:false,message:"Product not found"})
        }
        // Delete Image from the server
        if(product.image){
            const imagePath = path.join(__dirname,'../upload',product.image);
            fs.unlink(imagePath,(err)=>{
                if(err){
                    res.send("We're unable to delete image at this time")
                }
            })
            const newImg = req.file.filename
            const prod = {
                title:title,
                description:description,
                price:price,
                image: newImg
            }
            const newProduct = await Product.findByIdAndUpdate(id,prod)
            if(!newProduct){
                res.send("We could not update at the moment")
            }
            res.send(newProduct)
        }
    } catch (error) {
        res.status(500).json({success:false, message:"Server error", error:error.message})
    }
}
// Delete Product
exports.deleteProduct = async(req,res)=>{
    // getting id from the url
    const {id} = req.params
    // getting prduct with the id from the db
    const item = await Product.findById(id)
    // delete image from the server(e.g upload folder)
    if(item.image){
        const imageUrl = path.join(__dirname,'../upload',item.image)
        fs.unlink(imageUrl,(err)=>{
            if(err){
                res.send("Could not delete image at the momenet")
            }
        })
        // delete image from the db
        try {
            await Product.findByIdAndDelete(id)
            res.send("Product deleted successfully")
        } catch (error) {
            
        }
    }
    
}