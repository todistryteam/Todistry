const express = require('express')
var controller = require('./user.controller')
var auth = require('../../auth/auth.service')
const router = express()

router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.post('/editProfile', auth.checkAuth, controller.editProfile)
router.post('/getById', auth.checkAuth, controller.getById)

router.post('/subscribe', controller.subscribe)
router.post('/subscribeList', auth.checkAdminAuth, controller.subscribeList)

router.post('/contactUs', controller.contactUs)
router.post('/contactUsList', auth.checkAdminAuth, controller.contactList)

router.post('/logout', auth.checkAuth, controller.logout)

router.post('/resetPassword', controller.resetPassword)
router.post('/verifyResetPasswordCode', controller.verifyResetPasswordCode)
router.post('/updatePassword', controller.updatePassword)

router.post('/sendOTPForLogin', controller.sendOTPForLogin)
router.post('/loginOTPVerify', controller.loginOTPVerify)

router.post('/emailVerifyUser', controller.emailVerifyUser)

router.post('/checkEmail', controller.checkEmail)

module.exports = router
