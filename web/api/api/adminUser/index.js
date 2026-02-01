const express = require('express')
var controller = require('./adminUser.controller');
var auth = require('../../auth/auth.service');
const router = express()

router.post('/create', auth.checkAdminAuth, controller.create);
router.post('/getList', auth.checkAdminAuth, controller.index);
router.post('/getById', auth.checkAdminAuth, controller.getById);
router.post('/update', auth.checkAdminAuth, controller.update);
router.post('/remove', auth.checkAdminAuth, controller.remove);

router.post('/login', controller.login);
router.post('/logout', auth.checkAdminAuth, controller.logout);
router.post('/ChangePassword', auth.checkAdminAuth, controller.ChangePassword);

module.exports = router;
