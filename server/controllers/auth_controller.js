const users = require('../models/users')

let id = 1

module.exports = {
    login: (req, res, next) => {
        const {username, password} = req.body
        const user = users.find(user => username === user.username && password === user.password)
        if (user) {
            req.session.user.username = username
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(500)
        }
    }, 
    register: (req, res, next) => {
        const {username, password} = req.body
        users.push({id, username, password})
        id++

        req.session.user.username = username
        res.status(200).send(req.session.user)
    },
    signout: (req, res, next) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}