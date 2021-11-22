const express = require('express')
const router = express.Router()

//Import models
const UserInfo = require('../models/user_info')
const UserGameHistory = require('../models/user_game_history')


router.post('/login', async (req, res) => {
    const user = await UserInfo.findOne({
        username: req.body.username
    })
    if(!user){
        res.status(404).json({
            message: 'User tidak ditemukan'
        })
    } else{
        if(user.password === req.body.password){
            res.status(200).json({
                message: 'Anda dapat login'
            })
        } else{
            res.status(401).json({
                message: 'Periksa kembali password Anda!'
            })
        }
    }
})

router.post('/signup', async (req, res) => {
    try{
        const userExist = await UserInfo.findOne({ username: req.body.username })
        if(userExist){
            res.status(401).json({
                message: 'Username telah dipakai'
            })
        } else{
            const newUser = new UserInfo({
                username: req.body.username,
                password: req.body.password
            })
            const userCreated  = await newUser.save()
            const users = await UserInfo.find({})
            res.redirect('/register')
        }

    } catch(error){
        res.status(500).send(error)
    }
})

router.get('/users/history_create', async (req, res) => {
    try{
        const newHistory = new UserGameHistory({
            username: 'test1',
            score: 10
        })
        const userHistoryCreated  = await newHistory.save()
        res.status(200).json(userHistoryCreated)
    } catch(error){
        res.status(500).send(error)
    }
})

router.get('/users', async (req, res) => {
    try{
        const users = await UserInfo.find({})
        res.send(users)
    } catch(error){
        res.status(500).send(error)
    }
})

module.exports = router