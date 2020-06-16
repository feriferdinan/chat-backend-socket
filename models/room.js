'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING
  }, {});
  room.associate = function(models) {
    // associations can be defined here
  };
  return room;
};