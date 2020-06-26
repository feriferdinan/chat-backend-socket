var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/AuthController');


/* GET users listing. */

router.get('/tes', function (req, res) {
    res.send({ message: "Tes OK" })
});
router.post('/login', AuthController.login);
// router.post('/register', AuthController.register);
// router.get('/verify', AuthController.verifyEmail);

module.exports = router;