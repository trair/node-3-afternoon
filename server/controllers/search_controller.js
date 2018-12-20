const swag = require('../models/swag')

module.exports = {
    search: (req, res, next) => {
        const {category} = req.query
        if (category) {
            const filtered = swag.filter(item => item.category === category)
            res.status(200).send(filtered)
        } else {
            res.status(200).send(swag)
        }
    }
}