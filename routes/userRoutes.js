const express = require('express')
const { register } = require('../controllers/userController')


const router = express.Router()


router.post('/api/users',register)

module.exports = router