const express = require('express');
const router = express();
const LikeController = require('../controllers/likes_controller');
router.get('/toggle',LikeController.toggleLike);

module.exports = router;