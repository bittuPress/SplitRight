const express = require('express')
const router=express.Router()
const expensesController = require('../controllers/Expenses')
router.post('/add-expenses',expensesController.createExpense)//route to create expense
router.get('/expenses', expensesController.getUserExpenses)
module.exports=router;
