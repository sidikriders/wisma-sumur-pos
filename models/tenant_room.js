'use strict'

module.exports = (sequelize, DataTypes) => {
  const tenant_room = sequelize.define('tenant_room', {
    roomId: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    dateIn: DataTypes.DATE,
    dateOut: DataTypes.DATE
  })

  tenant_room.associate = function(models) {
    // associations can be defined here
    tenant_room.belongsTo(models.room, { as: 'room' })
    tenant_room.belongsTo(models.tenant, { as: 'tenant' })
  }

  return tenant_room
}