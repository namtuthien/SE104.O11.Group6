const express = require('express')
const router = express.Router();

// import controller
const AccountController = require('../controllers/AccountController.js')

router.get('/information', AccountController.information)
router.put('/information', AccountController.informationPut)

router.get('/history', AccountController.history)
router.post('/history', AccountController.addReview)

router.get('/card', AccountController.paymentAccount)
router.post('/card/addBank', AccountController.addBank)
router.post('/card/addDebit', AccountController.addDebit)
router.post('/card/delBank', AccountController.delBank)
router.post('/card/delDebit', AccountController.delDebit)

router.get('/change-password', AccountController.changePassword)

module.exports = router