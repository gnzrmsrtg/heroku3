const express = require('express')
const router = express.Router()

const authenticate = require('../middlewares/authentication')

router.use('/auth', require('./auth'))
router.use('/users', authenticate, require('./users'))
router.use('/products', authenticate, require('./products'))
router.use('/reviews', authenticate, require('./reviews'))
router.use('/orders', require('./orders'))

module.exports = router