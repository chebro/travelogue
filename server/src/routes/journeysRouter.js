const router = require('express').Router()

const journeysController = require('../controllers/journeysController')

router.post('/publish', journeysController.setPublished)

module.exports = router
