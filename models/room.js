'use strict';
const { v4: uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING
  }, {

  });
  room.associate = function (models) {
    room.hasMany(models.participants, {
      foreignKey: 'room_id',
    })
    room.hasMany(models.message, {
      foreignKey: 'room_id',
    })
  };
  room.beforeCreate((room, options) => {
    room._id = uuid();
    return room;
  });
  return room;
};