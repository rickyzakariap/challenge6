const express = require('express')
const app = express()
const port = process.env.port || 8000;
const Sequelize = require('sequelize')

const userController = require('./controllers/usercontroller');
const method = require('./controllers/method');


// Setting template engine EJS
app.set('view engine', 'ejs')

//set support body 
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//important to link css and other static file that in public folder
app.use(express.static('public'));



//INDEX OR START
app.get('/', userController.homeRender)

//GAMEPLAY
app.get('/game', userController.gameRender)


//LOGIN PAGE will redirect /game/:username
app.get('/login', userController.loginGet)
app.post('/login', userController.loginPost)


//REGISTER PAGE or Create Method here
app.get('/register', userController.registerGet)
app.post('/register', userController.registerPost)

//Read Method here
app.get('/user_list', method.user_list)

//Update Method here
app.get('/user_update', method.updateGet)
app.post('/user_update', method.updateInfo) 

//Delete Method here
app.get('/user_delete', method.deleteGet)
app.post('/user_delete', method.deleteDestroy)

app.listen(port, () => {
    console.log(`Go to http://localhost:${port}`)
})