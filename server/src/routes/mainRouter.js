const router = require('express').Router()
const mainController = require('../controllers/mainController.js')

/* Routing middleware */
router.route('/').get(mainController.getIndex)
router.route('/login').get(mainController.getLogin)
router.route('/register').get(mainController.getRegister)
router.route('/:user/travels').get(mainController.getTravels)

module.exports = router
