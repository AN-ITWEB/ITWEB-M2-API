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

module.exports.removeProgram = async (req, res) => {
    await db.removeProgram(req.params.programId);
    res.status(200);
    res.json(req.body.programId);
};

module.exports.updateLogged = async (req, res) => {
    await db.updateLogged(req.body.Logged, req.body.programId, req.body.exerciseId);
    res.status(200);
    res.json(req.body);
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