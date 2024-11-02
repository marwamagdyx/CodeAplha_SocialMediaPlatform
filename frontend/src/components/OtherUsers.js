import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/user.png';
import '../UserProfile.css'; // Assuming custom styles
import Post from './Post';
import bground from '../assets/bg.jpg';

const OtherUsers = () => {
  const { id } = useParams(); // Target user ID from URL
  const [user, setUser] = useState({}); // Target user data
  const [posts, setPosts] = useState([]); // Target user's posts
  const [isFollowing, setIsFollowing] = useState(false); // Follow status

  // Fetch the current user data and posts when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the target user data
        const userResponse = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(userResponse.data);

        // Fetch the posts of the target user
        const postsResponse = await axios.get(`http://localhost:5000/api/posts/user/${id}`);
        setPosts(postsResponse.data);

        // Check if the logged-in user is following the target user
        const followStatusResponse = await axios.get(
          `http://localhost:5000/api/users/${id}/isFollowing`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        setIsFollowing(followStatusResponse.data.isFollowing); // Update follow status
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  // Handle follow/unfollow action
  const handleFollow = async () => {
    try {
        if (isFollowing) {
            // Unfollow the user
            await axios.post(
                `http://localhost:5000/api/users/unfollow/${id}`,
                {},
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setIsFollowing(false);
            // Decrease the follower count dynamically
            setUser((prevUser) => ({
                ...prevUser,
                followers: prevUser.followers.filter(followerId => followerId !== id), // assuming followers is an array of follower IDs
            }));
        } else {
            // Follow the user
            await axios.post(
                `http://localhost:5000/api/users/follow/${id}`,
                {},
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setIsFollowing(true);
            // Increase the follower count dynamically
            setUser((prevUser) => ({
                ...prevUser,
                followers: [...prevUser.followers, id], // assuming you push the logged-in user ID into the followers array
            }));
        }
    } catch (error) {
        console.error('Error following/unfollowing user:', error);
    }
};

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card overflow-hidden">
        <div className="card-body p-0">
          <img
            src={bground}
            alt=""
            className="img-fluid"
          />
          <div className="row align-items-center">
            {/* User statistics */}
            <div className="col-lg-4 order-lg-1 order-2">
              <div className="d-flex align-items-center justify-content-around m-4">
                <div className="text-center">
                  <i className="fa fa-file fs-6 d-block mb-2"></i>
                  <h4 className="mb-0 fw-semibold lh-1">{posts.length}</h4>
                  <p className="mb-0 fs-4">Posts</p>
                </div>
                <div className="text-center">
                  <i className="fa fa-user fs-6 d-block mb-2"></i>
                  <h4 className="mb-0 fw-semibold lh-1">
                    {user.followers ? user.followers.length : 0}
                  </h4>
                  <p className="mb-0 fs-4">Followers</p>
                </div>
                <div className="text-center">
                  <i className="fa fa-check fs-6 d-block mb-2"></i>
                  <h4 className="mb-0 fw-semibold lh-1">
                    {user.following ? user.following.length : 0}
                  </h4>
                  <p className="mb-0 fs-4">Following</p>
                </div>
              </div>
            </div>

            {/* User profile image and name */}
            <div className="col-lg-4 mt-n3 order-lg-2 order-1">
              <div className="mt-n5">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <div
                    className="linear-gradient d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '110px', height: '110px' }}
                  >
                    <div
                      className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden"
                      style={{ width: '100px', height: '100px' }}
                    >
                      <img
                        src={user.profilePicture || avatar}
                        alt="Profile"
                        className="w-100 h-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h5 className="fs-5 mb-0 fw-semibold">{user.username}</h5>
                </div>
              </div>
            </div>

            {/* Follow/Unfollow Button */}
            <div className="col-lg-4 order-last">
              <div className="d-flex justify-content-end m-3">
                <button
                  onClick={handleFollow}
                  className={`btn ${isFollowing ? 'btn-secondary' : 'btn-success'}`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>

          {/* Nav tabs for Profile */}
          <ul
            className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-light-info rounded-2"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="true"
              >
                <i className="fa fa-user me-2 fs-6"></i>
                <span className="d-none d-md-block">Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
          tabIndex="0"
        >
          <div className="row">
            <div className="col-lg-4">
              <div className="card shadow-none border">
                <div className="card-body">
                  <h4 className="fw-semibold mb-3">About</h4>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="fa fa-envelope text-dark fs-6"></i>
                      <h6 className="fs-4 fw-semibold mb-0">Bio: {user.bio || 'No bio available'}</h6>
                    </li>
                    <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="fa fa-envelope text-dark fs-6"></i>
                      <h6 className="fs-4 fw-semibold mb-0">{user.email}</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Displaying User Posts */}
            <div className="col-lg-8">
              <div className="row">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div className="col-md-6 mb-3" key={post._id}>
                      <Post post={post} />
                    </div>
                  ))
                ) : (
                  <p>No posts available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUsers;
