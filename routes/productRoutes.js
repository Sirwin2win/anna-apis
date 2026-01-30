const { createProduct,getProducts,upadateProduct, deleteProduct, fetchSingle } = require("../controllers/productController");
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
router.get('/api/products/:id',fetchSingle)
router.put('/api/products/:id',upload.single('image'),upadateProduct)
router.delete('/api/products/:id',deleteProduct)

module.exports = router