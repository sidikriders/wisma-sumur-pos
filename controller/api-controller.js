var express = require('express')

var router = express.Router()

var adminController = require('./admin-controller')
var roomController = require('./room-controller')

router.use('/admin', adminController)
router.use('/rooms', roomController)

module.exports = router