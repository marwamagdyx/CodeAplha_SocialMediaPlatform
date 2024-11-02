import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; // Import custom CSS styles
import avatar from '../assets/user-circle.svg';
import like from '../assets/like.png';
import commentbtn from '../assets/chat.png';

const Post = ({ post, fetchPosts }) => {
    const [comment, setComment] = useState(''); // State for comment input
    const [showComments, setShowComments] = useState(false); // State to toggle comment visibility
    const [likesCount, setLikesCount] = useState(post.likes.length); // Track likes count
    const [commentsCount, setCommentsCount] = useState(post.comments.length); 


    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:5000/api/posts/${post._id}/like`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Post liked');
            setLikesCount((prevLikes) => prevLikes + 1);
         // Refresh the post list after liking
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault(); // Prevent form submission
        if (!comment.trim()) return; // Prevent submitting empty comments
        try {
            await axios.post(`http://localhost:5000/api/posts/${post._id}/comment`, { content: comment }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Comment added');
           // Refresh the post list after adding a comment
           setCommentsCount((prevComments) => prevComments + 1);
            setComment('');
             // Clear the comment input after submission
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Function to format timestamp
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Formats date and time
    };

    return (
        <div className="card mb-3 shadow-none border">
            <div className="card-body border-bottom">
                {/* Post Header with Avatar, Dynamic User Name, and Time */}
                <div className="d-flex align-items-center gap-3">
                    <img src={avatar} alt="avatar" className="rounded-circle" width="40" height="40" />
                    {/* Display the post author's name dynamically */}
                    <h6 className="fw-semibold mb-0 fs-4">{post.user.username}</h6>
                    <span className="ms-auto text-muted small">{formatTimestamp(post.createdAt)}</span> {/* Add post timestamp */}
                </div>

                {/* Post Content */}
                <p className="text-dark my-3">{post.content}</p>
                {post.image && (
                    <img src={post.image} alt="Post" className="img-fluid rounded-4 w-100 object-fit-cover" style={{ height: '360px' }} />
                )}

                {/* Post Actions (Like, Comment, Share) */}
                <div className="d-flex align-items-center my-3">
                    <div className="d-flex align-items-center gap-2">
                        <a className="like-btn text-white d-flex align-items-center justify-content-center bg-primary p-1 fs-5 rounded-circle" href="#!" onClick={handleLike}>
                            <i className="fa fa-thumbs-up">
                                <img src={like} alt="like" className="img-fluid icon-small" />
                            </i>
                        </a>
                        <span className="text-dark fw-semibold">{likesCount}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 ms-4">
                        <a className="comment-btn text-white d-flex align-items-center justify-content-center bg-secondary p-1 fs-5 rounded-circle" href="#!" onClick={() => setShowComments(!showComments)}>
                            <i className="fa fa-comments">
                                <img src={commentbtn} alt="comment" className="img-fluid icon-small" />
                            </i>
                        </a>
                        <span className="text-dark fw-semibold">{commentsCount}</span>
                    </div>
                </div>

                {/* Comments Section: Toggle Visibility Based on `showComments` */}
                {showComments && (
                    <div className="position-relative">
                        {post.comments.map((comment) => (
                            <div key={comment._id} className="p-4 rounded-2 bg-light mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <img src={avatar} alt="comment avatar" className="rounded-circle" width="33" height="33" />
                                    {/* Display the comment author dynamically */}
                                    <h6 className="fw-semibold mb-0 fs-4">{comment.user.username}</h6>
                                    <span className="ms-auto text-muted small">{formatTimestamp(comment.createdAt)}</span> {/* Add comment timestamp */}
                                </div>
                                {/* Display the comment content */}
                                <p className="my-3">{comment.content}</p>
                            </div>
                        ))}

                        {/* Comment Input */}
                        <div className="d-flex align-items-center gap-3 p-3">
                            <img src={avatar} alt="avatar" className="rounded-circle" width="33" height="33" />
                            <input
                                type="text"
                                className="form-control py-2"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleComment}>Comment</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
