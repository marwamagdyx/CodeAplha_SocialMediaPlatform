import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; // Import the CSS
import avatar from '../assets/user-circle.svg';
const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setBio(response.data.bio);
        setProfilePicture(response.data.profilePicture);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/profile', {
        username, email, password, bio, profilePicture
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <hr className="mt-0 mb-4" />
      <div className="row">
        {/* Profile Picture Section */}
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <img
                className="img-account-profile rounded-circle mb-2"
                src={profilePicture || avatar}
                alt="Profile"
              />
              <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
              <input
                type="text"
                className="form-control mb-2"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                placeholder="Enter Profile Picture URL"
              />
              <button className="btn btn-primary" type="button">Upload new image</button>
            </div>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">Username</label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputPassword">Password</label>
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Bio Field */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputBio">Bio</label>
                  <input
                    className="form-control"
                    id="inputBio"
                    type="text"
                    placeholder="Enter a short bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                {/* Save Changes Button */}
                <button className="btn btn-primary" type="submit">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
