'use strict'

module.exports = (sequelize, DataTypes) => {
  const tenant = sequelize.define('tenant', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    noTelp: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    idCardPicture: DataTypes.STRING
  })

  tenant.associate = (models) => {
    // associations can be defined here
    tenant.hasMany(models.tenant_room, { foreignKey: 'tenantId' })
  }

  return tenant
}