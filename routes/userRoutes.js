const express = require('express')
const { register,login , getUsers} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


const router = express.Router()


router.get('/',protect,getUsers)
router.post('/register',register)
router.post('/login',login)

module.exports = router