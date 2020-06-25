var model = require('../models');
const { v4: uuid } = require('uuid');

exports.index = async function (req, res) {
    try {
        const rooms = await model.room.findAll({});
        if (rooms.length !== 0) {
            res.status(200).json({
                'status': true,
                'message': '',
                'data': rooms
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
            'message': err.messages,
            'data': {}
        })
    }
};

exports.store = async function (req, res) {
    try {
        const {
            user_id,//array of user id
            name,
            type
        } = req.body;
        const rooms = await model.room.create({
            name,
            type
        });
        let user_and_room = user_id.map(e => {
            return {
                user_id: e,
                room_id: rooms._id
            }
        })
        const participants = await model.participants.bulkCreate(user_and_room)
        if (rooms && participants) {
            res.status(201).json({
                'status': true,
                'message': 'Room Has Been Added',
                'data': { rooms, participants },
            })
        }
    } catch (err) {
        res.status(400).json({
            'status': false,
            'message': err,
            'data': {},
        })
    }
};