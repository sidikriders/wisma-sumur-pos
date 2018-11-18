'use strict'

module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    room_type_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  })

  room.associate = function(models) {
    room.belongsTo(models.room_type, { as: 'type' })
  }
  return room
}