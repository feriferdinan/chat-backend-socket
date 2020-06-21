var express = require('express');
var router = express.Router();

var RoomController = require('../controllers/RoomController');

router.get('/', RoomController.index);
router.post('/', RoomController.store);

module.exports = router;