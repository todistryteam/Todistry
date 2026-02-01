const express = require('express')
var controller = require('./tree.controller')
var auth = require('../../auth/auth.service')
const router = express()

router.post('/create', auth.checkAuth, controller.create);
router.post('/getList', auth.checkAuth, controller.index);
router.post('/getParentList', auth.checkAuth, controller.getParentList);
router.post('/getTreeNew', auth.checkAuth, controller.getTreeNew);
router.post('/getTreeDetails', auth.checkAuth, controller.getTreeDetails);
router.post('/appgetTree', controller.appgetTree);
router.post('/getById', auth.checkAuth, controller.getById);
router.post('/update', auth.checkAuth, controller.update);
router.post('/memberDetails', auth.checkAuth, controller.memberDetails);
router.post('/profileDetails', auth.checkAuth, controller.profileDetails);
router.post('/remove', auth.checkAuth, controller.remove);
router.post('/removeMember', auth.checkAuth, controller.removeMember);
router.post('/undoMember', auth.checkAuth, controller.undoRemoveMember);


module.exports = router
