const express = require('express');
const app = express();
const authRoutes = require('./routes/oauth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

//set up view

app.set("view engine", 'ejs');

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


