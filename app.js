const express = require('express');
const app = express();
const authRoutes = require('./routes/oauth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
//set up view

app.set("view engine", 'ejs');

app.use(cookieSession({
    mageAge: 60*60*24*1000,
    keys: [keys.session.cookieKey],
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.mongodbURI, ()=>{
    console.log("connected");
});



app.use('/auth', authRoutes);

app.get('/', (req, res)=>{
    res.render('home');
});


app.listen(3000, ()=>{
    console.log('App is running on port 3000');
});


