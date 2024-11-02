const express = require('express');
const { createPost, likePost, addComment, fetchPosts,getPostsByUser, getCommentsByPostId } = require('../controllers/postController');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Prevents overwriting
    },
});

const upload = multer({ storage });
// Routes for creating posts, liking posts, and adding comments
router.post('/create', auth, upload.single('image'), createPost);
router.get('/', auth, fetchPosts);
router.post('/:id/like', auth, likePost);
router.post('/:id/comment', auth, addComment);
router.get('/user/:userId', getPostsByUser);
router.get('/:id/comments', getCommentsByPostId);
module.exports = router;
