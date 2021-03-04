const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
const { route } = require('./api/v1/users');

router.get('/profile/:id', passport.checkAuthentication ,userController.profile);

router.post('/signup/new_user',userController.signupNew);
router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.post('/update/:id',passport.checkAuthentication,userController.update);

// use passport as a middleware to authenticate
router.post('/signin/login', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
) , userController.signinLogin);
router.get('/signout' , userController.signout);

router.get('/auth/google', passport.authenticate('google', {scope:['profile' , 'email']}));

router.get('/auth/google/callback' , passport.authenticate('google', {failureRedirect: '/users/signin'}),userController.signinLogin);

module.exports = router;