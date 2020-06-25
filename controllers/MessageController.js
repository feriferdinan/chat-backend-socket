var model = require('../models');
const { v4: uuid } = require('uuid');

exports.index = async function (req, res) {
    try {
        const messages = await model.room.findAll({
            include: [
                {
                    model: model.participants,
                    attributes: ["_id"],
                    include: [{ model: model.user, attributes: ["_id", "name", "avatar"] }]
                },
                {
                    model: model.message,
                    include: [{ model: model.user, attributes: ["_id", "name", "avatar"] }]
                },
            ]
        });
        if (messages) {
            res.status(200).json({
                'status': true,
                'message': 'Success ',
                'data': messages
            })
        } else {
            res.status(204).json({
                'status': false,
                'message': 'EMPTY',
                'data': {}
            })
        }
    } catch (err) {
        res.status(500).json({
            'status': false,
            'message': err,
            'data': {}
        })
    }
};

exports.store = async function (req, res) {
    try {
        const {
            _id,
            room_id,
            text,
            image,
            video
        } = req.body;
        const message = await model.message.create({
            _id,
            user_id: req.userData._id,
            room_id,
            text,
            image,
            video
        })
        if (message) {
            res.status(201).json({
                'status': true,
                'message': 'message Has Been Added',
                'data': message,
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