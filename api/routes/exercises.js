var express = require('express');
var router = express.Router();

const ctrlExercises = require('../controllers/exercisesController');
router.post('/', ctrlExercises.exercises);
router.post('/delete', ctrlExercises.dropCollection);

module.exports = router;
