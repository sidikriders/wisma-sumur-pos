var express = require('express')

var router = express.Router()

var auth = require('../middleware/authenticator')
var models = require('../models')
var Room = models.room
var RoomType = models.room_type

router.get('/', (req, res, next) => {
  Room.findAll({
    include: {
      model: RoomType,
      attributes: ['id', 'name', 'price'],
      as: 'roomType'
    },
    attributes: ['id', 'name']
  }).then(rooms => res.send({
    status: true,
    msg: 'Success get all rooms',
    data: rooms
  })).catch(err => next(err))
})

router.post('/', auth.isAdmin, (req, res, next) => {
  // {
  //   roomTypeId: 2,
  //   name: "C 02"
  // }
  Room.create(req.body).then(newRoom => {
    return res.send({
      status: true,
      msg: 'Success create new room',
      data: newRoom
    })
  }).catch(err => next(err))
})

router.get('/:id', (req, res,next) => {
  Room.findById(req.params.id).then(room => res.send({
    status: true,
    msg: 'Success get by id',
    data: room
  })).catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  Room.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedRoom => res.send({
    status: true,
    msg: 'Success Update Room',
    data: updatedRoom
  })).catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  Room.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send({
    status: true,
    msg: 'Success delete room'
  })).catch(err => next(err))
})

module.exports = router
