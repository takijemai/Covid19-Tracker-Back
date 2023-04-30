const express= require('express')
const router= express.Router()
 const authctrl= require('../controllers/auth')


 router.post('/login', authctrl.login)
 router.post('/signup', authctrl.signup)


 module.exports= router