'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    user_id: DataTypes.STRING,
    room_id: DataTypes.STRING,
    text: DataTypes.TEXT,
    image: DataTypes.STRING,
    video: DataTypes.STRING
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};