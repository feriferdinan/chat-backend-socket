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