var db = require('../mongoHandler');

module.exports.programs = async (req, res) => {
    var result = await db.AddProgram(req.body);
    res.status(201);
    res.json(result);

};

module.exports.getprograms = async (req, res) => {
    var data = await db.GetCollection("programs");
    res.status(200);
    res.json(data);
};

module.exports.dropCollection = async (req, res) => {
    await db.DropCollection();
    res.redirect('/')
};

module.exports.AddExerciseToProgram = async (req, res) => {
    var data = await db.AddExerciseToProgram(req.body.exercise, req.body.programId);
    res.status(201);
    res.json(data);
};

module.exports.RemoveExerciseFromProgram = async (req, res) => {
    var data = await db.RemoveExerciseFromProgram(req.body.exerciseId, req.body.programId);
    res.status(200);
    res.json(data);
};