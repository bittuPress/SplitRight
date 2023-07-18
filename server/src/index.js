const express = require('express')
require('dotenv').config()
const connection = require('./dbConfig/connection')
const Users = require('./models/users')
connection()
const app = express()
app.use(express.json())

 
app.post('/register', (req, res) => {
 Users.create(req.body)
 res.json({
 msg: "Users created successfully"
 })
})

 app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })