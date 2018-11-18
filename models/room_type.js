'use strict'

module.exports = (sequelize, DataTypes) => {
  const room_type = sequelize.define('room_type', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  })

  room_type.associate = function(models) {
    room_type.hasMany(models.room, { foreignKey: 'roomTypeId' })
  }

  return room_type
}