var express = require('express')
var bcrypt = require('bcrypt')

var router = express.Router()

var auth = require('../middleware/authenticator')
var models = require('../models')
var TenantRoom = models.tenant_room
var Room = models.room
var Tenant = models.tenant

router.get('/', (req, res, next) => {
  TenantRoom.findAll({
    include: [{
      model: Room,
      as: 'room'
    }, {
      model: Tenant,
      as: 'tenant'
    }]
  }).then(resp => res.send({
    status: true,
    data: resp
  })).catch(err => next(err))
})

router.post('/', (req, res, next) => {
  // {
  //   roomId: 'wajib',
  //   tenantId: 'wajib',
  //   dateIn: 'wajib',
  //   dateOut: null
  // }
  TenantRoom.create(req.body).then(newTR => res.send({
    status: true,
    msg: 'Success Create Relation',
    data: newTR
  })).catch(err => next(err))
})

module.exports = router