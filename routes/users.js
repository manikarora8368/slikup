const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile', userController.profile);

// use passport as a middleware to authenticate
router.post('/signin/login', passport.authenticate(
    'local',
    {failureRedirect: '/signin'}
) , userController.signinLogin);

module.exports = router;