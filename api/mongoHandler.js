var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const url = "mongodb://fitness:fitness1@ds141872.mlab.com:41872/fitness";
const dbName = 'fitness';
const exerciseCollection = 'exercises';

module.exports.AddExercise = async (exercise) => {
    var exerciseObj = {authToken , Exercise: exercise.Name, Description: exercise.Description, Set: exercise.Set, RepsTime: exercise.RepsTime };

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

module.exports.RemoveExerciseFromProgram = async (authToken ,exerciseId, programId) => {
    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        var program = await dbo.collection("programs").findOne({"_id" : ObjectId(programId), "Owner.token": authToken})
        if(program != null){
            var filteredExercises = program['Exercises'].filter(function(value, index, arr){
                return value.id != exerciseId;
            });
            program.Exercises = filteredExercises
            await dbo.collection("programs").replaceOne({"_id" : ObjectId(programId)}, {"Owner" : program.Owner, "Exercises" : filteredExercises} );
        }
        return program
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}

module.exports.AddExerciseToProgram = async (authToken, exercise, programId) => {
    var exerciseObj = {id: new ObjectId(), Exercise: exercise.Exercise, Description: exercise.Description, Set: exercise.Set, RepsTime: exercise.RepsTime, Logged: false };
    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        var program = await dbo.collection("programs").findOne({"_id" : ObjectId(programId), "Owner.token": authToken})
        if(program != null){
            program['Exercises'].push(exerciseObj);
            await dbo.collection("programs").replaceOne({"_id" : ObjectId(programId)}, {"Owner" : program.Owner, "Exercises" : program.Exercises} );
        }
        return program
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}

module.exports.updateLogged = async (authToken, Logged, programId, exerciseId) => {
    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        var data = await dbo.collection("programs").updateOne({_id: ObjectId(programId), "Exercises.id": ObjectId(exerciseId), "Owner.token": authToken}, {"$set":{"Exercises.$.Logged":Logged}})
        if(data.matchedCount == 1)
            return Logged
        return null
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}

module.exports.AddProgram = async (program) => {
    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        var insertedObj = await dbo.collection("programs").insertOne(program)
        var obj = {_id: toHexString(insertedObj.insertedId.id), Owner: program.Owner, Exercises: program.Exercises}
        return obj;
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}

module.exports.removeProgram = async (authToken, programId) => {
    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName);
        var data = await dbo.collection("programs").deleteOne({_id: ObjectId(programId), "Owner.token": authToken})
        if(data.deletedCount == 1)
            return data.deletedCount
        return null
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

module.exports.GetCollection = async (collection) => {
    var conn = await MongoClient.connect(url, {useNewUrlParser: true});
    try {
        var dbo = conn.db(dbName) ;
        var data = dbo.collection(collection).find({}).toArray();
        return data;
    } catch (error) {
        console.log(error);
    }
    finally{
        await conn.close();
    }
}