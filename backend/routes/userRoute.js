const express = require('express');
const router = express.Router();
const { register, login ,getUserProfile,updateUserProfile, getAllUsers,getUserById,followUser, isFollowing} = require('../controllers/userController');
const auth = require('../middleware/auth');


// User registration and login routes
router.post('/register', register);
router.post('/login', login);

router.get('/profile', auth, getUserProfile);

// Update user profile
router.put('/profile', auth, updateUserProfile);
router.get('/users',auth, getAllUsers);
router.get('/:id', getUserById);
router.post('/follow/:id', auth, followUser);
router.get('/:id/isFollowing', auth, isFollowing);

module.exports = router;
