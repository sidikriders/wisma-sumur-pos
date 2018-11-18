'use strict'

module.exports = (sequelize, DataTypes) => {
  const adminRole = sequelize.define('admin_role', {
    name: DataTypes.STRING
  })

  adminRole.associate = function(models) {
    // associations can be defined here
  }
  return adminRole
}