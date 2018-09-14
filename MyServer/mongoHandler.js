var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://fitness:fitness1@ds141872.mlab.com:41872/fitness";
const dbName = 'fitness';
const exerciseCollection = 'exercises';

module.exports.AddExercise = async (exercise) => {
    var exerciseObj = { Exercise: exercise.Name, Description: exercise.Description, Set: exercise.Set, RepsTime: exercise.RepsTime };

    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        await dbo.collection(exerciseCollection).insertOne(exerciseObj);
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}

module.exports.DropCollection = async () => {
    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        dbo.collection(exerciseCollection).drop();
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}

module.exports.GetCollection = async () => {
    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        var data = dbo.collection(exerciseCollection).find({}).toArray();
        return data;
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}