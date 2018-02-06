const express = require('express');
const app = express();
const authRoutes = require('./routes/oauth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');

//set up view

app.set("view engine", 'ejs');

mongoose.connect("mongodb://localhost:27017/Oauth", (error, db)=>{
    if(error){
        return console.log("Unable to connect to database server");
    }
    console.log("Connected!");
    db.close();
});


app.use('/auth', authRoutes);

app.get('/', (req, res)=>{
    res.render('home');
});


app.listen(3000, ()=>{
    console.log('App is running on port 3000');
});


