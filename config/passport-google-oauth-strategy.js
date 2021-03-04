const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');
// tell passport to use new google strategy
passport.use(new googleStrategy({
    clientID: "17146081526-c6nufvh2va0puikrbstscjsemekenm4g.apps.googleusercontent.com",
    clientSecret: "QdkKlHDJeHY10IAFkaZEKykg",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
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