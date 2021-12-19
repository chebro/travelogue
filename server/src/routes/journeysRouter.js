const router = require('express').Router()

const journeysController = require('../controllers/journeysController')

router.post('/publish', journeysController.setPublished)
router.post('/coordinates', journeysController.getCoords)
router.put('/addlocation', journeysController.addLocation)
router.put('/addjourney', journeysController.createJourney)

module.exports = router
