var express = require('express');
var router = express.Router();

const ctrprograms = require('../controllers/programsController');
router.post('/', ctrprograms.programs);
router.post('/AddExercise', ctrprograms.AddExerciseToProgram);
router.post('/RemoveExercise', ctrprograms.RemoveExerciseFromProgram);
router.post('/delete', ctrprograms.dropCollection);
router.delete('/:programId', ctrprograms.removeProgram);
router.patch('/UpdateLogged', ctrprograms.updateLogged);
router.get('/', ctrprograms.getprograms);

module.exports = router;
