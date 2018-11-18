var express = require('express')
var bcrypt = require('bcrypt')

var router = express.Router()

var auth = require('../middleware/authenticator')
var models = require('../models')
var Room = models.room
var RoomType = models.room_type

router.get('/', (req, res, next) => {
  RoomType.findAll({
    include: {
      model: Room,
      attributes: ['id', 'name']
    },
    attributes: ['id', 'name', 'price']
  }).then(types => {
    return res.send({
      status: true,
      data: types
    })
  }).catch(err => next(err))
})

router.post('/', auth.isAdmin, (req, res, next) => {
  RoomType.create(req.body).then(newType => {
    return res.send({
      status: true,
      msg: 'Success create room type',
      data: newType
    })
  }).catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  RoomType.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedType => {
    return res.send({
      status: true,
      msg: 'success update Room Type'
    })
  }).catch(err => next(err))
})

router.delete('/:id', auth.isAdmin, (req, res, next) => {
  var typeId = req.params.id
  Room.findAll({
    where: {
      roomTypeId: typeId
    },
    attributes: ['id', 'name']
  }).then(rooms => {
    if (rooms.length > 0) {
      return res.send({
        status: false,
        msg: 'Room Type still have assigned room',
        data: rooms
      })
    } else {
      return RoomType.destroy({
        where: {
          id: typeId
        }
      })
    }
  }).then(() => {
    return res.send({
      status: true,
      msg: 'Success delete Room Type'
    })
  }).catch(err => next(err))
})

module.exports = router