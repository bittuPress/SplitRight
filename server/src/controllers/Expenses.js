const expenseModel = require('../models/Expenses')

const path= require('path')
const fs =require('fs')
const createExpense = async(req, res)=>{//function to create expense
    
    // if(req.file.filename) req.body.receiptImage = req.file.filename
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
const getUserExpenses = async(req, res)=>{//function to get all  expenses
    try{
        const count = await expenseModel.find().count()
        let data
        if(req.query.size && req.query.page){
            data = await expenseModel.find().sort({_id:-1})
            .skip(req.query.page)
            .limit(req.query.size)
        }else{
            data = await expenseModel.find().sort({_id:-1})
        }
        if(data){
            res.json({
                data,
                msg: "Fetching Data",
                success: true,
                total:count

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
const getUserExpensesById = async(req,res) => {

    const data =  await expenseModel.findById(req.params.id)
    console.log(data)
    if(data){
        res.json({
            success: true,
            userData:data

        })
    }

}
const updateExpense = async (req, res) => {
    // try {
    //     //to check the current details of user
    //     await usersModel.findByIdAndUpdate(req.params.id,{ $set: req.body })
    //     const data = await usersModel.findById(req.params.id)
    //     if (data) {
    //         res.json({
    //             msg: "User Details changed successfully",
    //             success: true,
    //             userDetails: data
    //         })
    //     }
    // } catch (error) {
    //     console.log(error)
    // }


}
const deleteExpense = async (req, res) => {
    try {
        const data = await expenseModel.findByIdAndDelete(req.params.id)
        if (data) {
            res.json({
                msg: "Expense deleted successfully",
                success: true
            })
        }

    } catch(error) {
        console.log(error);
    }

}
module.exports = {createExpense,getUserExpenses,getExpenseImgById,deleteExpense,updateExpense,getUserExpensesById}