const Post = require('../models/Post');
const Comment = require('../models/Comment');
// Create a new post
exports.createPost = async (req, res) => {
    const content = req.body.content; // Access content directly from req.body
    const image = req.file ? req.file.path : null; // Access the image path from req.file
    console.log('req.user.id:', req.user.id); // Check if req.user.id exists
    console.log('req.file:', req.file); 
    try {
        const post = new Post({
            user: req.user.id, // User ID from auth middleware
            content,
            image, // This should now reference the image path correctly
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error(error); // Log the error for easier debugging
        res.status(500).json({ message: 'Server error' });
    }
};

// Like a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.includes(req.user)) {
            return res.status(400).json({ message: 'Post already liked' });
        }

        post.likes.push(req.user.id);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add comment to post
exports.addComment = async (req, res) => {
    const { content } = req.body;

    try {
        const post = await Post.findById(req.params.id);
        const comment = new Comment({
            user: req.user.id,
            post: req.params.id,
            content,
        });

        await comment.save();
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id })
        .populate('content')
            .populate('username')  // populate the user's name

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.fetchPosts = async (req, res) => {
    try {
        const posts = await Post.find() .populate('user', 'username') // Populate the user of the post with only the name field
        .populate({
            path: 'comments', // Populate the comments and their associated users
            populate: {
                path: 'user',
                select: 'username' // Select only the name field from the user in comments
            }
        }); // Populate user details if needed
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from the route params
        const posts = await Post.find({ user: userId }) .populate('user', 'username').populate({
            path: 'comments', // Populate the comments and their associated users
            populate: {
                path: 'user',
                select: 'username' // Select only the name field from the user in comments
            }
        }); // Populate user data if needed
        if (!posts) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};