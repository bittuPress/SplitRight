const expenseModel = require('../models/Expenses')


const createExpense = async(req, res)=>{//function to create expense
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
module.exports = {createExpense}