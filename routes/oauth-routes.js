const router = require('express').Router();
const passport = require('passport');


//oauth login
router.get('/login', (req, res)=>{
    res.render('login');
});

//auth with google 
router.get('/google', passport.authenticate("google", {
    scope: ['profile']
}));

//auth logout
router.get('/logout', (req, res)=>{
    res.send('loggin out');
});

//callback route for google to redirect
router.get('/google/redirect', (req, res)=>{
    res.send('successfully logged in');
});

module.exports = router;