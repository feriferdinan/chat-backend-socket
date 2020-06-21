'use strict';
// const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    user_id: { type: DataTypes.UUID },
    room_id: { type: DataTypes.UUID },
    text: DataTypes.TEXT,
    image: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
  });
  message.associate = function (models) {
    message.belongsTo(models.user, {
      foreignKey: 'user_id',
    })
    message.belongsTo(models.room, {
      foreignKey: 'room_id',
    })
  };
  // message.beforeCreate((message, options) => {
  //   message._id = uuid();
  //   return message;
  // });
  return message;
};