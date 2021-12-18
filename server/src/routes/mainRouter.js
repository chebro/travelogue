const router = require('express').Router()
const mainController = require('../controllers/mainController.js')

/* Routing middleware */
router.route('/').get(mainController.getIndex)

module.exports = router
