var db = require('../mongoHandler');
var getPem = require('rsa-pem-from-mod-exp')
const ax = require('axios');
var jwt = require('jsonwebtoken');

var googleVerificationSite = 'https://accounts.google.com/.well-known/openid-configuration';
var modulus = '';
var exponent = '';

module.exports.programs = async (req, res) => {
    var id = await getIdFromToken(req.headers.authorization)
    if(id == null){
        res.status(401);
        res.json("No Token given");
    } 
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
    var id = await getIdFromToken(req.headers.authorization)
    var data = await db.removeProgram(id, req.params.programId);
    returnStatus(data, res, 200)
};

module.exports.updateLogged = async (req, res) => {
    var id = await getIdFromToken(req.headers.authorization)
    var data = await db.updateLogged(id, req.body.Logged, req.body.programId, req.body.exerciseId);
    returnStatus(data, res, 200)
};

module.exports.AddExerciseToProgram = async (req, res) => {
    var id = await getIdFromToken(req.headers.authorization)
    var data = await db.AddExerciseToProgram(id, req.body.exercise, req.body.programId);
    returnStatus(data, res, 201)
};

module.exports.RemoveExerciseFromProgram = async (req, res) => {
    var id = await getIdFromToken(req.headers.authorization)
    var data = await db.RemoveExerciseFromProgram(id, req.body.exerciseId, req.body.programId);
    returnStatus(data, res, 200)
};

async function getIdFromToken(token){
    let decodedToken;
    await retrieveModulusAndExponent();
    jwt.verify(token, getPem(this.modulus, this.exponent), (err, decode) => {
        if(err) console.log(err);
        decodedToken = decode;
    })
    console.log(decodedToken);
    return decodedToken.sub
}

function returnStatus(data, res, successCode){
    if(data != null){
        res.status(successCode);
        res.json(data);
    } else {
        res.status(401);
        res.json("Token does not give access to the wanted resource");
    }
}

async function retrieveModulusAndExponent(){
    var googleUrl = (await ax.get(googleVerificationSite)).data.jwks_uri;
    var data = (await ax.get(googleUrl)).data;
    this.modulus = data.keys[1].n;
    this.exponent = data.keys[1].e;
}