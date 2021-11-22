/**
 * User Game History Schema
 */

 const mongoose = require('mongoose')

 //Schema
 const UserGameHistorySchema = mongoose.Schema({
     username: String,
     score: Number,
 })
 
 const user_game_history = mongoose.model('user_game_history', UserGameHistorySchema)
 
 module.exports = user_game_history