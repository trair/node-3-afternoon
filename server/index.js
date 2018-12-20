require('dotenv').config()
const express = require('express')
const session = require('express-session')
const { SERVER_PORT, SESSION_SECRET } = process.env

// Middleware
const checkForSession = require('./middlewares/checkForSession')

// Controllers
const swag_controller = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')

const app = express()

// Top-level middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

// Endpoints
app.get('/api/swag', swag_controller.read)
app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get ('/api/user', auth_controller.getUser)
app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.delete)
app.get('/api/search', search_controller.search)


app.listen(SERVER_PORT, () => console.log(`Kenny says to watch port ${SERVER_PORT}`))