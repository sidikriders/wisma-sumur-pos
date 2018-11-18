var express = require('express')
var bcrypt = require('bcrypt')

var router = express.Router()

var auth = require('../middleware/authenticator')
var models = require('../models')
var Room = models.room
var RoomType = models.room_type

module.exports = router