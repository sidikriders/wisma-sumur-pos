'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.TEXT,
    roleId: DataTypes.INTEGER
  })

  admin.associate = (models) => {
    admin.belongsTo(models.admin_role, { as: 'role' })
  }

  return admin
}