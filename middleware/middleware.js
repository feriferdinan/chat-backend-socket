const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    const token = (req.headers.authorization != undefined) ? req.headers.authorization.split(' ')[1] : false
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(403).send({
                    "code": 403,
                    "status": "ERROR",
                    "message": err,
                    "data": {}
                })
            } else {
                req.userData = decoded;
                next();
            }
        })
    } else {
        res.status(403).send({
            "code": 403,
            "status": "ERROR",
            "message": "Token is undefined",
            "data": {}
        })
    }
}

