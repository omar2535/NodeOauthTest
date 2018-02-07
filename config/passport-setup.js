const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
    //Options for google strat
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL:"/auth/google/redirect",
    
}, (accessToken, refreshToken, profile, done)=>{
    //Check if user already exists in DB
    User.findOne({
        googleId: profile.id
    }).then((currentUser)=>{
        if(currentUser){
            //Already have user
            console.log("user already exists");
            done(null, currentUser);
        }else{
            //if not, create user in DB
            new User({
                username: profile.displayName,
                googleId: profile.id,
            }).save().then((newUser)=>{
                done(null, newUser);
            });
        }
    });

    })
);

