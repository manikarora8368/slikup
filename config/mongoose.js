const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/slikup_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console , "error connecting to db"));

db.once('open' , function(){
    console.log("successfuly connected to db");
})
module.exports = db;