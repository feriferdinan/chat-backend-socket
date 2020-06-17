var model = require('../models');

exports.index = async function (req, res) {
    try {
        const users = await model.user.findAll({});
        if (users.length !== 0) {
            res.status(200).json({
                'code': 200,
                'status': true,
                'message': '',
                'data': users
            })
        } else {
            res.status(204).json({
                'code': 204,
                'status': false,
                'message': 'EMPTY',
                'data': {}
            })
        }
    } catch (err) {
        res.status(500).json({
            'code': 500,
            'status': false,
            'message': err.messages,
            'data': {}
        })
    }
};

exports.store = async function (req, res) {
    try {
        const {
            name,
            username,
            email,
            password,
            phone_number
        } = req.body;
        const users = await model.user.create({
            name,
            username,
            email,
            password,
            phone_number: phone_number
        });
        if (users) {
            res.status(201).json({
                'code': 201,
                'status': true,
                'message': 'User Has Been Added',
                'data': users,
            })
        }
    } catch (err) {
        res.status(400).json({
            'code': 400,
            'status': false,
            'message': err.message,
            'data': {},
        })
    }
};