const { createProduct,getProducts } = require("../controllers/productController");
const express = require('express')
const multer = require('multer')


const storage = multer.diskStorage({
    destination:'upload',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


const router = express.Router()


router.post('/api/products',upload.single('image'),createProduct)
router.get('/api/products',getProducts)

module.exports = router