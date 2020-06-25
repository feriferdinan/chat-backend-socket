const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    const token = (req.headers.authorization != undefined) ? req.headers.authorization.split(' ')[1] : false
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(403).send({
                    "status": false,
                    "message": err,
                    "data": {}
                })
            } else {
                req.userData = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            "status": false,
            "message": "Token is undefined",
            "data": {}
        })
    }
}

