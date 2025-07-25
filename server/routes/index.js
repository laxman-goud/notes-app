const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

// app routes
router.get('/', mainController.homePage)
router.get('/about', mainController.about)
router.get('/features', mainController.features)

module.exports = router;