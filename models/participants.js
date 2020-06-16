'use strict';
module.exports = (sequelize, DataTypes) => {
  const participants = sequelize.define('participants', {
    user_id: DataTypes.STRING,
    room_id: DataTypes.STRING
  }, {});
  participants.associate = function(models) {
    // associations can be defined here
  };
  return participants;
};