var express = require('express');
var router = express.Router();

const ctrlHomePage = require('../controllers/homepageController');
/* GET home page. */
router.get('/', ctrlHomePage.index);

module.exports = router;
