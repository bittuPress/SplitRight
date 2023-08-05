const express = require('express')
const router=express.Router()
const usersController = require('../controllers/Users')
router.post('/register',usersController.createUser)//route to create user
router.post('/login',usersController.loginUser)//route to login user
router.put('/user/:id',usersController.updateUser)//route to update user

//router.get('/verify-phone/:phoneNumber',usersController.checkPhoneNum)//route to check phone number with params passed
module.exports=router;
