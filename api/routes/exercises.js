var express = require('express');
var router = express.Router();

const ctrlExercises = require('../controllers/exercisesController');
router.post('/', ctrlExercises.exercises);
router.post('/delete', ctrlExercises.dropCollection);
router.get('/', ctrlExercises.getExercises);

module.exports = router;
