var model = require('../models');


exports.patch = async function (req, res) {
    try {
        const {
            name,
            username,
            email,
            password,
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
                'code': 201,
                'status': true,
                'message': 'User Has Been updated',
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