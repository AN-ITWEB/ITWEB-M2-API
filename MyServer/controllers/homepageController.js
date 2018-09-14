var db = require('../mongoHandler');

module.exports.index = async (req, res) => {
    var data = await db.GetCollection();
    res.render('index', { title: 'Our Fitness app', exercises: data });
};