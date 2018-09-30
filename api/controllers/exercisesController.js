var db = require('../mongoHandler');

module.exports.exercises = async (req, res) => {
    await db.AddExercise(req.body);
    res.redirect('/')
};

module.exports.getExercises = async (req, res) => {
    var data = await db.GetCollection("exercises");
    res.status(200);
    res.json(data);
};

module.exports.dropCollection = async (req, res) => {
    await db.DropCollection();
    res.redirect('/')
};