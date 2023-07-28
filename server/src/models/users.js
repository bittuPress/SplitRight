const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
 fullName: String, 
 phoneNumber: {type:String,required:true},
 email: {type:String,required:true},
 password: String
});
 
const Users = mongoose.model('Users', userSchema);

module.exports = Users