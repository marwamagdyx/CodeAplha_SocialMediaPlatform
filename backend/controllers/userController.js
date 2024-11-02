const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user.id; // Assuming req.user contains logged-in user info
        // Find all users, excluding the logged-in user and passwords
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Ensure req.user contains user ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { username, email, password, bio, profilePicture } = req.body;
    
 // Log the user ID

    try {
        const user = await User.findById(req.user); // Use req.user to find the user

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields conditionally
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        user.bio = bio;
        user.profilePicture = profilePicture;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Register user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.followUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) return res.status(404).json({ message: 'User not found' });

    if (!user.following.includes(userToFollow._id)) {
      user.following.push(userToFollow._id);
      userToFollow.followers.push(user._id);

      await user.save();
      await userToFollow.save();
    }

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.isFollowing = async (req, res) => {
    try {
      const loggedInUser = await User.findById(req.user.id);
      const targetUser = await User.findById(req.params.id);
  
      if (!targetUser) {
        return res.status(404).json({ message: 'Target user not found' });
      }
  
      // Check if the logged-in user is following the target user
      const isFollowing = loggedInUser.following.includes(targetUser._id);
  
      res.status(200).json({ isFollowing });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };