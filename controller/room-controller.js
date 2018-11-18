var express = require('express')
var bcrypt = require('bcrypt')

var router = express.Router()

var auth = require('../middleware/authenticator')
var models = require('../models')
var RoomType = models.RoomType

module.exports = router