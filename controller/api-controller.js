var express = require('express')

var router = express.Router()

var adminController = require('./admin-controller')
var roomController = require('./room-controller')
var roomTypeController = require('./room-type-controller')
var tenantController = require('./tenant-controller')
var tenantRoomController = require('./tenant-room-controller')

router.use('/admin', adminController)
router.use('/rooms/type', roomTypeController)
router.use('/rooms', roomController)
router.use('/tenants', tenantController)
router.use('/tenant-rooms/', tenantRoomController)

module.exports = router