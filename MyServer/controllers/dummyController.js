var db = require('../mongoHandler');

module.exports.dummy = async (req, res) => {
    var exerciseObj = { Name: "Plank", Description: "Place your elbows on the floor shoulderwidth apart with legs stretched out behind you so only your elbows and toes are in contact with the ground. Use your abdominal muscles to keep …", Set: "1", RepsTime: "30 sec" };
    await db.AddExercise(exerciseObj);
    res.redirect('/');
};