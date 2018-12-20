const swag = require('../models/swag')

module.exports = {
    add: (req, res, next) => {
        const {id} = req.query
        const exists = req.session.user.cart.find(item => item.id === id)
        if (exists) {
            res.status(200).send(req.session.user)
        } else {
            const swagToAdd = swag.find(item => item.id === +id)
            req.session.user.cart.push(swagToAdd)
            req.session.user.total += swagToAdd.price
            res.status(200).send(req.session.user)
        }
    },
    delete: (req, res, next) => {
        const {id} = req.query
        let {cart} = req.session.user
        const itemToRemove = cart.find(item => item.id = id)
        if (itemToRemove) {
            const index = cart.indexOf(item => item.id = id)
            cart.splice(index, 1)
            req.session.user.total -= itemToRemove.price
        }
        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next) => {
        let {user} = req.session
        user.cart = []
        user.total = 0
        res.status(200).send(req.session.user)
    }
}