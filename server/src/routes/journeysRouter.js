const router = require('express').Router()

const journeysController = require('../controllers/journeysController')

router.get('/:user/', journeysController.signup)
router.get('/login', journeysController.login)

module.exports = router
