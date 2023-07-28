const usersModel = require('../models/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const createUsers = async(req, res)=>{//function to register users
    try{
        const data= await usersModel.findOne({phoneNumber:req.body.phoneNumber }) //check if number exists
        if(data) {
            res.json({
            msg: "Phone Number already exists",
            success: false
            })
            return
        }
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        const token = jwt.sign({ phoneNumber:req.body.phoneNumber}, process.env.SECRET_KEY);
        const insertData = await usersModel.create(req.body)
        if(insertData){
            const {password, ...otherFields} = insertData._doc //send all userData except password
            res.json({
                msg: "Users created successfully",
                success: true,
                token,
                userDetails: otherFields
            })
        }
        
    }catch(err){
        console.log(err)
    }
    
}

// const checkPhoneNum = async(req,res) => {
//     if(req.params.phoneNumber){
//         const data= await usersModel.findOne({phoneNumber:req.params.phoneNumber })
//         if(data) {
//             res.json({
//             msg: "Phone Number already exists",
//             isNumExist: true
//             })
//         }else{
//             res.json({
//             isNumExist: false
//             })
//         }
//     }else{
//         console.log("Params empty!!!")
//     }
// }

module.exports = {createUsers}