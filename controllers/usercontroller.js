//Models here
const { Users, UserBiodata, UserHistory } = require('../models')
const Sequelize = require('sequelize')

module.exports = {
    //Login and Register part (Create method)
    registerPost: async (req, res) => {
        try {
            const {
                email,
                password,
                username
            } = req.body;

            //validator if user has existed
            // console.log(`input: ${email}, Password: ${password}, Username: ${username}`)
            const usersExisted = await Users.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                // .then(data => console.log(data))
                // .catch(err => console.log(err))

            // console.log(usersExisted) //if null then continue if not then pass an error
            //save result to db here
            if (!usersExisted) {
                Users.create({
                    username: username,
                    email: email,
                    password: password
                }).then((userGames) => {
                    console.log(userGames)
                    UserBiodata.create({
                        name: username,
                        user_id: userGames.id
                    });
                    res.redirect('/login')
                });
            } else {
                res.status(404).json({
                    message: "Email already existed"
                })
                console.log("Failed!")
            }
        } catch (error) {
            console.log(error)
        }
    },

    loginPost: async (req, res) => {
        try{
            const {
                email,
                password
            } = req.body
            // console.log(`input: ${email}, Password: ${password}`)
            const userFind = await Users.findOne({
                where: {
                    email: email,
                    password: password
                }
            })
            // console.log(userFind)
    
    
            if (userFind) {
                res.redirect(`/game?username=${userFind.username}`)
                console.log(userFind.username + userFind.id)
            } else {
                res.status(404).json({
                    message: "Email or Password is wrong"
                })
                console.log("Failed!")
            }
        }catch(error) {
            console.log(error)
        }
    },

    registerGet: async (req, res) => {
        res.render('register')
    },

    homeRender: async (req, res) => {
        res.render('user')
    },

    loginGet: async (req, res) => {
        res.render('login')
    },

    gameRender: async (req, res) => {
        res.render('game', {
            username: req.query.username || 'PLAYER 1'
        })
    },

   
}