const express = require('express')
var controller = require('./dashboard.controller');
var auth = require('../../auth/auth.service');
const router = express()

router.post('/getDashboardCounts', auth.checkAdminAuth, controller.getDashboardCounts);
router.post('/getRecentOrders', auth.checkAdminAuth, controller.getRecentOrders);

router.post('/bestSellingProducts', auth.checkAdminAuth, controller.bestSellingProducts);
router.post('/weeklyBestSellingProducts', auth.checkAdminAuth, controller.weeklyBestSellingProducts);
router.post('/monthlyBestSellingProducts', auth.checkAdminAuth, controller.monthlyBestSellingProducts);
router.post('/ordersTimeLine', auth.checkAdminAuth, controller.ordersTimeLine);

router.post('/totalOrder', auth.checkAdminAuth, controller.totalOrder);

module.exports = router;
