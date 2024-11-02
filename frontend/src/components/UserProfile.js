// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css'; // Ensure Bootstrap is imported // For custom styles, if needed
import avatar from '../assets/user.png';
import PostForm from './PostForm';
import bground from '../assets/bg.jpg';

const UserProfile = () => {
  const [profile, setProfile] = useState(null); // Changed from 'user' to 'profile'
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Retrieve token from local storage

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProfile(response.data);

            if (response.data._id) {
                const postsResponse = await axios.get(`http://localhost:5000/api/posts/user/${response.data._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPosts(postsResponse.data);
            } else {
                console.error('User ID is undefined');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    fetchUserProfile();
}, []);

const fetchPosts = async () => {
    if (profile && profile._id) {
        const postsResponse = await axios.get(`http://localhost:5000/api/posts/user/${profile._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setPosts(postsResponse.data);
    }
};
  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
  };

  if (!profile) return <p>Loading...</p>; 

    return (
        <div className="container">
            <div className="card overflow-hidden">
                <div className="card-body p-0">
                    <img src={bground}alt="" className="img-fluid" />
                    <div className="row align-items-center">
                        <div className="col-lg-4 order-lg-1 order-2">
                            <div className="d-flex align-items-center justify-content-around m-4">
                                <div className="text-center">
                                    <i className="fa fa-file fs-6 d-block mb-2"></i>
                                    <h4 className="mb-0 fw-semibold lh-1">{posts.length}</h4>
                                    <p className="mb-0 fs-4">Posts</p>
                                </div>
                                <div className="text-center">
                                    <i className="fa fa-user fs-6 d-block mb-2"></i>
                                    <h4 className="mb-0 fw-semibold lh-1">{profile.followers ? profile.followers.length : 0}</h4>
                                    <p className="mb-0 fs-4">Followers</p>
                                </div>
                                <div className="text-center">
                                    <i className="fa fa-check fs-6 d-block mb-2"></i>
                                    <h4 className="mb-0 fw-semibold lh-1">{profile.following ? profile.following.length : 0}</h4>
                                    <p className="mb-0 fs-4">Following</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mt-n3 order-lg-2 order-1">
                            <div className="mt-n5">
                                <div className="d-flex align-items-center justify-content-center mb-2">
                                    <div className="linear-gradient d-flex align-items-center justify-content-center rounded-circle" style={{ width: '110px', height: '110px' }}>
                                        <div className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden" style={{ width: '100px', height: '100px' }}>
                                            <img src={profile.profilePicture || avatar} alt="" className="w-100 h-100" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h5 className="fs-5 mb-0 fw-semibold">{profile.username}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 order-last">
                           
                        </div>
                    </div>
                    <ul className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-light-info rounded-2" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <button className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">
                                <i className="fa fa-user me-2 fs-6"></i>
                                <a href="/" className="text-decoration-none" > <span className="d-none d-md-block" >Home</span></a>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">
                                <i className="fa fa-user me-2 fs-6"></i>
                                <a href="/profile/edit" className="text-decoration-none" > <span className="d-none d-md-block" >Edit Profile</span></a>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card shadow-none border">
                                <div className="card-body">
                                    <h4 className="fw-semibold mb-3"></h4>
                                    <p> {profile.bio}</p>
                                    <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center gap-3 mb-4">
                    <i className="fa fa-envelope text-dark fs-6"></i>
                    <h6 className="fs-4 fw-semibold mb-0">Bio: {profile.bio || 'No bio available'}</h6>
                    </li>
                    <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="fa fa-envelope text-dark fs-6"></i>
                      <h6 className="fs-4 fw-semibold mb-0">{profile.email}</h6>
                    </li>
                    
                  </ul>
                                    <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
                                </div>
                            </div>
                        </div>
                   
                        <div className="col-lg-8">
                            {/* Add Post Form */}
                            <PostForm fetchPosts={fetchPosts} />  {/* Include the post form */}
                            <div className="row">
                                {posts.map(post => (
                                    <div className="col-md-12 mb-3" key={post._id}>
                                        <Post post={post} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
