var express = require('express')

var router = express.Router()

var adminController = require('./admin-controller')

router.use('/admin', adminController)

module.exports = router