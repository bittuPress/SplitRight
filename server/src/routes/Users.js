const express = require('express')
const router=express.Router()
const usersController = require('../controllers/Users')
router.post('/register',usersController.createUsers)//route to create user

router.get('/verify-phone/:phoneNumber',usersController.checkPhoneNum)//route to check phone number with params passed
module.exports=router;
