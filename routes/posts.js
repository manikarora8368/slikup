const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');

router.post('/create_post', postController.createPost);

module.exports = router;