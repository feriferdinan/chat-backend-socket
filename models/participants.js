'use strict';
module.exports = (sequelize, DataTypes) => {
  const participants = sequelize.define('participants', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.UUID,
    room_id: DataTypes.UUID
  }, {
  });
  participants.associate = function (models) {
    participants.belongsTo(models.user, {
      foreignKey: 'user_id',
    })
    participants.belongsTo(models.room, {
      foreignKey: 'room_id',
    })
  };
  return participants;
};