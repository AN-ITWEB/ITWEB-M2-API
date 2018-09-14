var express = require('express');
var router = express.Router();

const ctrlcreateExercise = require('../controllers/createExerciseController');
router.get('/', ctrlcreateExercise.createExercise);

module.exports = router;
