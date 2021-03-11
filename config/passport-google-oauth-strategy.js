const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const env = require('./environment');
const crypto = require('crypto');
const User = require('../models/user');
// tell passport to use new google strategy
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
},function(accessToken, refreshToken,profile ,done){
    // find a user
    User.findOne({username: profile.emails[0].value}).exec(function(err , user){
        if(err){console.log('error in finding error in google strategy passport'); return;}
        console.log(profile);
        // if found set this user as req.user
        if(user){
            return done(null ,user);
        }else{
            // if not found , create user and set this user as req.user
            User.create({
                username: profile.emails[0].value,
                name: profile.displayName,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('error in creating user in google auth' ,err); return;}
                return done(null , user);
            })
        }
    })
}));

module.exports= passport;