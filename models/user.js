'use strict';
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const saltRounds = require("../config/config").saltRounds;
const salt = bcrypt.genSaltSync(saltRounds);
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    defaultScope: { attributes: { exclude: ['password'] } },
    scopes: {
      withPassword: {
        attributes: {
          include: ['password']
        }
      }
    }
  });
  User.associate = function (models) {
    User.hasMany(models.message, {
      foreignKey: 'user_id',
    })
    User.hasMany(models.participants, {
      foreignKey: 'user_id',
    })

  };
  User.beforeCreate((user, options) => {
    user._id = uuid();
    const passwordHash = bcrypt.hashSync(user.password, salt);
    user.password = passwordHash;
    return user;
  });
  return User;
};