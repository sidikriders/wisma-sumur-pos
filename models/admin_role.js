'use strict'

module.exports = (sequelize, DataTypes) => {
  const admin_role = sequelize.define('admin_role', {
    name: DataTypes.STRING
  })

  admin_role.associate = (models) => {
    admin_role.hasMany(models.admin, { foreignKey: 'roleId' })
  }
  return admin_role
}