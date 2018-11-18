var express = require('express')
var bcrypt = require('bcrypt')

var router = express.Router()

var models = require('../models')
var AdminRole = models.admin_role
var Admin = models.admin

const saltRound = 10

router.get('/', (req, res, next) => {
  Admin.findAll({
    include: [{
      model: AdminRole,
      as: 'role',
      attributes: ['id', 'name']
    }],
    attributes: ['id', 'name', 'username']
  }).then(resp => {
    res.send(resp)
  }).catch(err => next(err))
})

router.post('/', (req, res, next) => {
  var payload = req.body
  // check password same with confirmPassword or no
  if (payload.password === payload.confirmPassword) {
    bcrypt.hash(payload.password, saltRound, (err, hash) => {
      if (err) {
        next(err)
      } else {
        payload.password = hash
        payload.roleId = 2
        Admin.create(payload).then(newAdmin => {
          res.send({
            status: true,
            msg: 'Success create new Admin',
            data: newAdmin
          })
        }).catch(err => next(err))
      }
    })
  } else {
    res.send({
      status: false,
      msg: 'Password didn\'t match'
    })
  }
})

router.get('/roles', (req, res, next) => {
  AdminRole.findAll({
    include: {
      model: Admin,
      attributes: ['id', 'name', 'username']
    },
    attributes: ['id', 'name']
  }).then(resp => {
    res.send(resp)
  }).catch(err => next(err))
})

module.exports = router