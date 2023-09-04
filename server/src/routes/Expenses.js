const express = require('express')
const router=express.Router()
const expensesController = require('../controllers/Expenses')

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/receipts')
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, Math.floor(Math.random() *10000000)+ file.originalname)
    }
})
const upload = multer({ storage: storage })
router.post('/add-expenses',upload.single('receiptImage'),expensesController.createExpense)//route to create expense
router.get('/expenses', expensesController.getUserExpenses)
router.get('/get-expenses/:id', expensesController.getUserExpensesById)
router.get('/expenses-img/:id', expensesController.getExpenseImgById)
router.put('/expenses/edit/:id',upload.single('receiptImage'), expensesController.updateExpense)//update expense by id
router.delete('/delete-expense/:id', expensesController.deleteExpense)
module.exports=router;
