/**
 * User Info Schema
 */

 const mongoose = require('mongoose')

 //Schema
 const UserInfoSchema = mongoose.Schema({
     email: String,
    username: String,
     password: String
 })
 
 const user_info = mongoose.model('user_info', UserInfoSchema)
 
 module.exports = user_info