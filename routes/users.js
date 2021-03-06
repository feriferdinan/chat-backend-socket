var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');

router.patch('/', UserController.patch);
router.post('/check', UserController.check);

module.exports = router;