const express = require('express');
const router = express();
const passport = require('passport');

const CommentController = require('../controllers/comments_controller');
router.post('/add_comment' ,passport.checkAuthentication, CommentController.addComment);
router.get('/destroy/:id' ,passport.checkAuthentication ,  CommentController.destroy);
module.exports = router;