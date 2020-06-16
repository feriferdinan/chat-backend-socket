require('dotenv').config();
var validator = require('validator');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const saltRounds = require("../config/config").saltRounds;
const salt = bcrypt.genSaltSync(saltRounds);

var model = require('../models');

exports.test = function (req, res) {
    res.send('ok');
}

exports.login = function (req, res) {
    if ((process.env.SECRET_KEY).length < 5) {
        return res.status(500).send({ 'message': 'terjadi kesalahan!' })
    }
    if (req.body.email == undefined)
        return res.status(400).send({ 'message': 'email is required!' })
    if (req.body.password == undefined)
        return res.status(400).send({ 'message': 'password is required!' })

    var email = req.body.email;
    var password = req.body.password;

    model.user.findOne({ where: { email: email } })
        .then(async function (user) {
            if (user == null)
                return res.status(401).send({ 'message': 'user not found!' })
            if (!bcrypt.compareSync(password, user.password))
                return res.status(401).send({ 'message': 'wrong password!' })

            var newData = {
                id: user.id,
                email: user.email,
                username: user.username,
            }
            var token = await jwt.sign(newData, process.env.SECRET_KEY);
            return res.send({
                data: newData,
                'token': token
            })
        })
        .catch(function (e) {
            console.log(e);
            res.status(400).json({
                'code': 400,
                'status': 'ERROR',
                'message': e.message,
                'data': {},
            })
        })
};
