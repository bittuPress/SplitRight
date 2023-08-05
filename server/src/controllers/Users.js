const usersModel = require('../models/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const createUser = async(req, res)=>{//function to register users
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
const loginUser=  async(req, res) => {
    try{
      const data = await usersModel.findOne({phoneNumber: req.body.phoneNumber}) 
      if(data){
        const isMatched = await bcrypt.compare(req.body.password, data.password)
        if(isMatched){
            const token = jwt.sign({ phoneNumber:req.body.phoneNumber}, process.env.SECRET_KEY);
            res.json({
                token:token,
                success: true,
                userDetails: data,
                msg: "Login successfull"
            })
        }else{
            res.json({
                success: false,
                msg: "Password didn't matched"
            })
        }
      }else{
        res.json({
            success: false,
            msg: "Phone Number doesn't exist"
        })
      }
    }catch(err){
        console.log(err)
    }
  
}
const updateUser = async (req, res) => {
    try {
        //to check the current details of user
        await usersModel.findByIdAndUpdate(req.params.id,{ $set: req.body })
        const data = await usersModel.findById(req.params.id)
        if (data) {
            res.json({
                msg: "User Details changed successfully",
                success: true,
                userDetails: data
            })
        }
    } catch (error) {
        console.log(error)
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

module.exports = {createUser, loginUser, updateUser}