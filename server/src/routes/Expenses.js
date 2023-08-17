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
router.get('/expenses-img/:id', expensesController.getExpenseImgById)
router.delete('/delete-expense/:id', expensesController.deleteExpense)
module.exports=router;
