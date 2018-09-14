var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://fitness:fitness1@ds141872.mlab.com:41872/fitness";
const dbName = 'fitness';
const exerciseCollection = 'exercises';

module.exports.AddExercise = async (exercise) => {
    var exerciseObj = { Exercise: exercise.Name, Description: exercise.Description, Set: exercise.Set, RepsTime: exercise.RepsTime };

    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        return toHexString(await dbo.collection(exerciseCollection).insertOne(exerciseObj).insertedId.id);
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
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