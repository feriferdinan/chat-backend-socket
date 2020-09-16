var express = require('express');
var router = express.Router();

var MessageController = require('../controllers/MessageController');

router.get('/', MessageController.index);
router.get('/byroom', MessageController.byroom);
router.post('/', MessageController.store);

module.exports = router;