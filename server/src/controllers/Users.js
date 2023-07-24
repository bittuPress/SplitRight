const usersModel = require('../models/Users')

const createUsers = async(req, res)=>{//function to register users
   await usersModel.create(req.body)
    res.json({
    msg: "Users created successfully"
    })
}

const checkPhoneNum = async(req,res) => {
    if(req.params.phoneNumber){
        const data= await usersModel.findOne({phoneNumber:req.params.phoneNumber })
        if(data) {
            res.json({
            msg: "Phone Number already exists",
            isNumExist: true
            })
        }else{
            res.json({
            isNumExist: false
            })
        }
    }else{
        console.log("Params empty!!!")
    }
}

module.exports = {createUsers, checkPhoneNum}