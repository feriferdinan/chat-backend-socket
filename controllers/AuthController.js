require('dotenv').config();
var validator = require('validator');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const saltRounds = require("../config/config").saltRounds;
const salt = bcrypt.genSaltSync(saltRounds);

var model = require('../models');

exports.login = function (req, res) {
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
                _id: user._id,
                email: user.email,
                username: user.username,
            }
            var token = await jwt.sign(newData, process.env.SECRET_KEY);
            newData.avatar = user.avatar
            newData.phone_number = user.phone_number
            return res.status(200).send({
                'status': true,
                'message': 'Success Login',
                "data": newData,
                'token': token,

            })
        })
        .catch(function (e) {
            console.log(e);
            res.status(500).json({
                'status': false,
                'message': e.message,
                'data': {},
            })
        })
};
async function sendEmail(email, token) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: 'Verify Your email', // Subject line
        html: `<a href="${process.env.API_BASE_URL}/auth/verify?token=${token}" >klik to verify</a>`
    };

    await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log("err")
        }
        else {
            console.log(info);
        }
    });
}

exports.register = async function (req, res) {
    if (req.body.email || validator.isEmail(req.body.email) == false)
        return res.status(400).send({ 'message': 'Email Empty or wrong format!' })
    if (req.body.password || validator.isLength(req.body.password, { min: 8, max: 10 }) == false)
        return res.status(400).send({ 'message': 'password length min 8, max 10' })

    await model.user.findOne({ where: { email: req.body.email } })
        .then(function (user) {
            if (user != null)
                return res.status(200).send({ 'message': 'email already registered' });
            createUser(userData = req.body);
        })
        .catch(function (e) {
            res.status(400).send({ 'message': 'error' })
        })

    async function createUser(userData) {
        var emailToken = await bcrypt.hashSync(req.body.email, salt);

        await model.user.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            emailToken: emailToken,
        })
            .then(async function (user) {
                await sendEmail(user.email, user.emailToken)

                var newUser = {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                }
                return res.status(201).send({
                    data: newUser,
                    message: 'verify your email!'
                })
            })
            .catch(function (e) {
                res.status(400).send({ 'message': "error" })
            })
    }
}

exports.verifyEmail = function (req, res) {
    var token = req.query.token;
    model.user.findOne({ where: { emailToken: token } })
        .then(function (user) {
            if (user == null)
                return res.status(404).send({ 'message': 'link invalid' })
            model.user.update(
                {
                    emailToken: null,
                    isActive: true
                },
                { where: { _id: user._id } }
            )
                .then(function (result) {
                    res.status(200).send({ "message": "success, user now is verified" })
                })
                .catch(function (e) {
                    res.status(400).send({ 'message': e.message })
                })
        })
        .catch(function (e) {
            res.status(400).send({ 'message': e.message })
        })
}