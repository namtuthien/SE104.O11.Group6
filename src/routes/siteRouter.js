const express = require('express')
const router = express.Router();

// import controller
const SiteController = require('../controllers/SiteController.js')

router.get('/about', SiteController.about)
router.get('/register', SiteController.register)
router.post('/register', SiteController.register)
router.get('/login', SiteController.login)
router.get('/forgot-password', SiteController.forgot);
router.get('/reset-password', SiteController.reset);
router.get('/search-results', SiteController.search);
router.get('/', SiteController.index)

module.exports = router