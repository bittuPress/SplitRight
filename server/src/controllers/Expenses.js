const expenseModel = require('../models/Expenses')

const path= require('path')
const fs =require('fs')
const createExpense = async(req, res)=>{//function to create expense
    
    if(req.file.filename) req.body.receiptImage = req.file.filename
    console.log(req.body)
    try{
        const insertData = await expenseModel.create(req.body)
        if(insertData){
            res.json({
                msg: "Expense added successfully",
                success: true
            })
        }
        
    }catch(err){
        res.json({
            msg: "Something went wrong!",
            success: false
        })
    }
    
}
const getUserExpenses = async(req, res)=>{//function to get all current user expenses
    try{
        const data = await expenseModel.find()
        if(data){
            res.json({
                data,
                msg: "Fetching Data",
                success: true
            })
        }
        
    }catch(err){
        res.json({
            msg: "Something went wrong!",
            success: false
        })
    }
    
}

const getExpenseImgById = async(req,res) => {

    const data =  await expenseModel.findById(req.params.id)
    const imageDir = path.join(__dirname,'../../',`uploads/receipts/${data.receiptImage}`) 
    if(fs.existsSync( imageDir )){
        res.sendFile(imageDir)
    }

}
module.exports = {createExpense,getUserExpenses,getExpenseImgById}