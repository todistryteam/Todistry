const express = require('express')
const router = express()

/* front website web routes */


/* admin web routes */
router.use('/adminuser', require('./api/adminUser'))
router.use('/user', require('./api/user'))

router.use('/family-tree', require('./api/familyTree'))
module.exports = router
