const Product = require('../models/productModel')


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