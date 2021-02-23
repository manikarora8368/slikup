const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField : 'username'
    },
    function(username , password, done){
        User.findOne({username:  username} , function(err , user){
            if (err){console.log('error in finding the error --> passport'); 
            return done(err);
        }
        if(!user || user.password != password ){
            console.log('invalid username/password');
            return done(null , false);
        }
        return done(null , user);
        });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user , done){
    done(null , user.id);
})

// deserializing the user from the key in the cookie
passport.deserializeUser(function(id , done){
     User.findById(id , function(err , user){
         if(err){
             console.log('error in finding the user --> passport');
             return done(err);
         }
         return done(null , user);
     })
});
module.exports = passport;