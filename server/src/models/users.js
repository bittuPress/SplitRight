const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
 fullName: String, 
 phoneNumber: Number,
 email: String,
 password: String
});
 
const Users = mongoose.model('Users', userSchema);

module.exports = Users