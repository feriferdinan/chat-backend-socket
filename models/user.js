'use strict';
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const saltRounds = require("../config/config").saltRounds;
const salt = bcrypt.genSaltSync(saltRounds);
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  User.beforeCreate((user, options) => {
    user.id = uuid();
    const passwordHash = bcrypt.hashSync(user.password, salt);
    user.password = passwordHash;
    return user;
  });
  return User;
};