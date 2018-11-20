'use strict';
module.exports = (sequelize, DataTypes) => {
  const tenant_room = sequelize.define('tenant_room', {
    room_id: DataTypes.INTEGER,
    tenant_id: DataTypes.INTEGER,
    date_in: DataTypes.DATE,
    date_out: DataTypes.DATE
  }, {});
  tenant_room.associate = function(models) {
    // associations can be defined here
  };
  return tenant_room;
};