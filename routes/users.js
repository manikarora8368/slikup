const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication ,userController.profile);

router.post('/signup/new_user',userController.signupNew);
router.get('/signup',userController.signup);
router.get('/signin',userController.signin);

// use passport as a middleware to authenticate
router.post('/signin/login', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
) , userController.signinLogin);
router.get('/signout' , userController.signout);

module.exports = router;