var express = require('express');
var router = express.Router();

const ctrlUsers = require('../controllers/dummyController');
router.get('/', ctrlUsers.dummy);

module.exports = router;
