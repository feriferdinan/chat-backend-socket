var model = require('../models');

exports.patch = async function (req, res) {
    try {
        const {
            name,
            username,
            email,
            phone_number,
            avatar
        } = req.body;
        const users = await model.user.update({
            _id: req.userData._id,
            name,
            username,
            email,
            phone_number,
            avatar
        });
        if (users) {
            res.status(201).json({
                'status': true,
                'message': 'User Has Been updated',
                'data': users,
            })
        }
    } catch (err) {
        res.status(400).json({
            'status': false,
            'message': err.message,
            'data': {},
        })
    }
};

exports.check = async function (req, res) {
    try {
        const {
            phone_number
        } = req.body;
        const users = await model.user.findAll({
            where: { 'phone_number': phone_number }
        });
        if (users.length != 0) {
            res.status(201).json({
                'status': true,
                'message': 'Success',
                'data': users,
            })
        } else {
            res.status(404).json({
                'status': false,
                'message': 'Not Found',
                'data': [],
            })
        }
    } catch (err) {
        res.status(400).json({
            'status': false,
            'message': err.message,
            'data': [],
        })
    }
};