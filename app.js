require('dotenv').config();

// inisiasi
const express = require('express')
const morgan = require('morgan')
const usersData = require('./db/users.json')
const fs = require('fs')
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');


// config
const app = express()
const port = 3300

//Import models
const UserInfo = require('./models/user_info')
const UserGameHistory = require('./models/user_game_history')

//Import controllers
const user_controllers = require('./controllers/user_controllers')

app.use('/api',user_controllers)

// Setting template engine EJS
app.set('view engine', 'ejs')

// body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())


// set morgan
app.use(morgan('dev'))

app.get('/', (request, response) => {
    response.render('index', {})
})

//Connection URI
const mongoURI = 'mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DB

//Connecting to MongoDB
mongoose.connect(mongoURI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection Error'))


//Import models
const user_info = require('./models/user_info')

app.get('/signup', (request, response) => {
    response.render('signup', {})
})

app.post('/signup', (req, res, next) => {
    const {
        signupusername,
        signuppassword,
        signupemail
    } = req.body

    // memasukan data ke array json
    usersData.push({
        username: signupusername,
        password: signuppassword,
        email: signupemail,
    })

    // menulis ulang file json dari data barunya
    fs.writeFileSync('./db/users.json', JSON.stringify(usersData))
    // JSON.parse() UBAH KE ARAH SEBALIKNYA

    return res.status(200).json({
        message: 'success'
    })
})

app.post('/login', (req, res, next) => {
    // ambil email dan password dari req.body

    const {
        email,
        password
    } = req.body

    // find email di file json
    const isExistUser = usersData.find((user) => user.email === email)

    if (!isExistUser) {
        return res.status(404).json({ // return menghentikan looping langssung selesai
            message: 'user not found'
        })
    }

    // compare password dari db dengan password dari request
    const isMatch = isExistUser.password === password

    // jika salah maka return invalid password

    if (!isMatch) {
        return res.status(401).json({
            message: 'password wrong'
        })
    }

    // jika benar return sukses

    return res.status(200).json({
        message: 'login success'
    })

})



app.get('/users', (req, res, next) => {
    return res.status(200).json({
        message: 'show all users',
        data: usersData
    })
})

// app.post('/login', function (req, res) {
//     res.redirect(200, '/game')
// });


// redirect from signin to game
app.get('/login', (req, res) => {
    res.redirect(200, '/game');
  });
  app.post('/game', (req, res) => res.render('game', {}));

app.get('/game', (request, response) => {
    response.render('game', {})
})

// Set semua file di views
app.set('views', './views');

// Middleware JSON dan urlencoded
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// Use file in public folder
app.use('/public', express.static('public'));

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})


app.listen(process.env.PORT, () => {
    console.log(`Application is running on http://localhost:${process.env.PORT}`)
})