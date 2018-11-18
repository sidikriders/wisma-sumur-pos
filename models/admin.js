'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.TEXT,
    roleId: DataTypes.INTEGER
  })

  admin.associate = function(models) {
    // associations can be defined here
  }

  return admin
}