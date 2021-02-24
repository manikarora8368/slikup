const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/posts_controller');

router.post('/create_post',passport.checkAuthentication, postController.createPost);

module.exports = router;