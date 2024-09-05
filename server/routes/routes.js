

const express = require('express')

const router = express.Router()
const  auth = require('../middleware/authenticate')

const {login , signup ,authenticate} = require('../controllers/auth')

router.post('/login' , login )
router.post('/signup' , signup)
router.get('/validUser' , auth ,authenticate)


module.exports = router;