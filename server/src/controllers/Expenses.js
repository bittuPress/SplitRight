const expenseModel = require('../models/Expenses')
const createExpense = async(req, res)=>{//function to create expense
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
module.exports = {createExpense,getUserExpenses}