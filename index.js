const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

// always put this above routes
app.use(expressLayouts);
// extract styles and scripts from the sub-pages in the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


//use express router
app.use('/',require('./routes'));

//set up view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error is ${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
})