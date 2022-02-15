//Models here
const { Users, UserBiodata, UserHistory } = require('../models')
const Sequelize = require('sequelize')

module.exports= {
    updateGet: async(req, res) => {
        res.render('users/user_update')
    },

    deleteGet: async(req, res) => {
        res.render('users/user_delete')
    },

     //Read method here
    user_list: async (req, res) => {
        try{
            var list = await UserBiodata.findAll()
                                // .then((data) => {console.log(data)})
            res.render('users/user_list', {
                userList: list
            })

        }catch(error) {
            console.log(error)
        }
    },

    //update method here

    updateInfo: async(req, res) =>{
        try{
            //Taking login method
            const {
                emailPrev,
                passwordPrev,
                emailNext,
                passwordNext,
                username,
                description
            } = req.body
            // console.log(`input: ${email}, Password: ${password}`)
            const userFind = await Users.findOne({
                where: {
                    email: emailPrev,
                    password: passwordPrev
                }
            })
            // console.log(userFind)
            if (userFind) {
                //Update username, email, password
                await Users.update({
                    username: username,
                    email: emailNext,
                    password: passwordNext
                },{
                    where: {
                      id: userFind.id
                    }
                })
                //Update biodata
                await UserBiodata.update({
                    username: username,
                    description: description
                },{
                    where: {
                      user_id: userFind.id
                    }
                })
                res.redirect('/')                                
            } else {
                res.status(404).json({
                    message: "Email or Password is wrong"
                })
                console.log("Failed!")
            }            

        }catch(error){
            console.log(error);
        }
    },

    deleteDestroy: async(req, res) =>{
        try{
        //Taking login method
            const {
                email,
                password,
            } = req.body
            // console.log(`input: ${email}, Password: ${password}`)
            const userFind = await Users.findOne({
                where: {
                    email: email,
                    password: password
                }
            })
            if (userFind) {
                //Delete username, email, password
                await Users.destroy({
                    where: {
                      id: userFind.id
                    }
                });
                res.redirect('/')                                
            } else {
                res.status(404).json({
                    message: "Email or Password is wrong"
                })
                console.log("Failed!")
            } 
        }catch(error){
            console.log(error);
        }
    }

}