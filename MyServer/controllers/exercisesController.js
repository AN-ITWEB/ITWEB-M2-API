var db = require('../mongoHandler');

module.exports.exercises = async (req, res) => {
    await db.AddExercise(req.body);
    res.redirect('/')
};

module.exports.dropCollection = async (req, res) => {
    await db.DropCollection();
    res.redirect('/')
};