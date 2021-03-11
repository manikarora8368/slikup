const mongoose = require('mongoose');
const env = require('../config/environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console , "error connecting to db"));

db.once('open' , function(){
    console.log("successfuly connected to db");
})
module.exports = db;