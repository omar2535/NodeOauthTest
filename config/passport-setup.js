const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-models');

passport.use(
    new GoogleStrategy({
    //Options for google strat
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL:"/auth/google/redirect",
    
}, (accessToken, refreshToken, profile, done)=>{
    new User({
        username: profile.displayName,
        googleId: profile.id,
    }).save().then((newUser)=>{
        console.log("added new user" + newUser);
    });
    })
);

