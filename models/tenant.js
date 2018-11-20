'use strict'

module.exports = (sequelize, DataTypes) => {
  const tenant = sequelize.define('tenant', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    no_telp: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    id_card_picture: DataTypes.STRING
  })

  tenant.associate = (models) => {
    // associations can be defined here
  }

  return tenant
}