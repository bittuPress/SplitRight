const mongoose = require('mongoose');
const { Schema } = mongoose;
const expSchema = new Schema({
 description: String, 
 billAmount: Number,
 paidBy: String,
 expensesDate: { type: Date, default: Date.now},
 addedBy: { type: String, default: ""},
 friendsInvolved: { type: String, default: ""},
 receiptImage: String
});
 
const Expenses = mongoose.model('Expenses', expSchema);

module.exports = Expenses