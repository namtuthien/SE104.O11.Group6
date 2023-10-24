const express = require('express')
const router = express.Router();

// import controller
const SiteController = require('../controllers/SiteController.js')

router.get('/register', SiteController.register)
router.get('/login', SiteController.login)
router.get('/', SiteController.index)

module.exports = router