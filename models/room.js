'use strict'

module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    roomTypeId: DataTypes.INTEGER,
    name: DataTypes.STRING
  })

  room.associate = function(models) {
    room.belongsTo(models.room_type, { as: 'roomType' })
  }
  return room
}