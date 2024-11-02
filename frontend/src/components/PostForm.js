
import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ fetchPosts }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/posts/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Post created:', response.data);
            fetchPosts(); // Refresh the post list
            setContent(''); // Clear input
            setImage(null); // Clear image input
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="col-lg-8"> {/* Set to the same width as posts */}
            <div className="card shadow-none border">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                style={{ height: '137px' }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                            <label htmlFor="floatingTextarea2" className="p-7">Share your thoughts</label>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                            <button className="btn btn-primary ms-auto" type="submit">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
