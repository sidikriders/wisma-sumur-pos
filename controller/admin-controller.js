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
    return res.send(resp)
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
          return res.send({
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
    return res.send(resp)
  }).catch(err => next(err))
})

router.post('/login', (req, res, next) => {
  Admin.findOne({
    where: {
      username: req.body.username
    },
    include: {
      model: AdminRole,
      attributes: ['id', 'name'],
      as: 'role'
    },
    attributes: ['id', 'name', 'username', 'password']
  }).then(admin => {
    if (admin) {
      bcrypt.compare(req.body.password, admin.password, (err, result) => {
        if (result) {
          req.session.login = true
          req.session.currUser = {
            username: admin.username,
            name: admin.name,
            role: {
              id: admin.role.id,
              name: admin.role.name
            }
          }
          console.log(req.session)
          return res.send(result)
        } else if (err) {
          next(err)
        } else {
          res.send({
            status: false,
            msg: 'Wrong Password'
          })
        }
      })
    } else {
      return res.send({
        status: false,
        msg: 'Admin doesn\'t exist'
      })
    }
  }).catch(err => next(err))
})

module.exports = router