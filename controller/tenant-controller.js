var express = require('express')
var bcrypt = require('bcrypt')

var router = express.Router()

var auth = require('../middleware/authenticator')
var models = require('../models')
var Tenant = models.tenant
var TenantRoom = models.tenant_room
var Room = models.room

const saltRound = 10

router.get('/', (req, res, next) => {
  Tenant.findAll({
    include: {
      model: TenantRoom,
      include: {
        model: Room,
        as: 'room'
      }
    },
  }).then(resp => res.send({
    status: true,
    data: resp
  })).catch(err => next(err))
})

router.post('/', (req, res, next) => {
  // {
  //   username: 'wajib',
  //   name: 'wajib',
  //   email: '',
  //   password: 'wajib',
  //   birthday: '',
  //   noTelp: '',
  //   alamat: '',
  //   idCardPicture: ''
  // }
  var payload = req.body
  bcrypt.hash(payload.password, saltRound, (err, hash) => {
    if (err) {
      next(err)
    } else {
      payload.password = hash
      Tenant.create(payload).then(newTenant => res.send({
        status: true,
        msg: 'Success Create Tenant',
        data: newTenant
      })).catch(err => next(err))
    }
  })
})

router.delete('/:id', auth.isAdmin, (req, res, next) => {
  Tenant.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send({
    status: true,
    data: 'Success delete Tenant'
  })).catch(err => next(err))
})

module.exports = router