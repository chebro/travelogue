const router = require('express').Router()

const journeysController = require('../controllers/journeysController')

router.post('/publish', journeysController.setPublished)
router.post('/coordinates', journeysController.getCoords)
router.put('/addlocation', journeysController.addLocation)

module.exports = router
