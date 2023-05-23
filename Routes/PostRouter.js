const express = require('express');
const AuthMw = require('../MiddlewWares/AuthMw');
const PostController = require('../Controllers/PostController');
const router = express.Router();

// Get All Posts
router.get('/', AuthMw, PostController.getPosts);
// Get Post By Id
router.get('/:id',AuthMw,PostController.getPostById);
// Get User Posts
router.get('/userPosts/:id',AuthMw,PostController.getUserPosts)
// Create Post
router.post('/create',AuthMw,PostController.createPost);
// Update Post

// Delete Post


module.exports = router;