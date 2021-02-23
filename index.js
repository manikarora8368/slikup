const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');



app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(cookieParser());


// always put this above routes
app.use(expressLayouts);
// extract styles and scripts from the sub-pages in the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


//set up view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(session({
    name: 'slikup',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error is ${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
})