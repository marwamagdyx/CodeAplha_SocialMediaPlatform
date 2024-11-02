import React, { useState,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import BackgroundImage from '../assets/Img.jpg';
import CheckIcon from '../assets/check-icon.svg'; 
import ShowPasswordIcon from '../assets/show-password-icon.svg'; 
import HidePasswordIcon from '../assets/hide-password-icon.svg';
import { Link } from 'react-router-dom';
import '../register.css'; 
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    // Check if the password meets the constraints
    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and include letters, numbers, and special characters.'
      );
    } else {
      setPasswordError('');
    }

    setIsFormValid(
      email.trim() !== '' &&
      username.trim() !== '' &&
      password.trim() !== '' &&
      passwordRegex.test(password) // Ensure password meets constraints
    );
  }, [email, username, password]);
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token); // Store JWT token
      navigate('/'); // Redirect to home after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering');
    }
  };

  // return (
  //   <div>
  //     <h2>Register</h2>
  //     {error && <p>{error}</p>}
  //     <form onSubmit={handleRegister}>
  //       <input
  //         type="text"
  //         placeholder="Username"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <button type="submit">Register</button>

  //     </form>
  //     <p>
  //       Already have an account? 
  //       <button 
  //         onClick={() => navigate('/login')} 
  //         style={{ marginLeft: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
  //       >
  //         Login
  //       </button>
  //     </p>
  //   </div>
  // );
  return (
    <div className="register-container">
      {/* Left side - Background Image */}
      <div
        className="left-section"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
      </div>

      {/* Right side - Sign Up Form */}
      <div className="right-section">
        <div className="form-containerRegister">
          <div className='titleContainer'>
            <h2 className="form-title">Create an account</h2>
            <h2 className="form-subtitle">Sign up now to claim your free space.</h2>
          </div>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className='inputContainerFirstAndLast'>
              <div>
                <div>
                  <label htmlFor='first' className="form-label">Username</label>
                  <label className="necessary"> *</label>
                </div>
                <input
                  id='first'
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className='inputContainer'>
              <div>
                <label className="form-label">Email</label>
                <label className="necessary"> *</label>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className='inputContainer'>
              <div>
                <label className="form-label">Password</label>
                <label className="necessary"> *</label>
              </div>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={toggleShowPassword}
                >
                  <img
                    src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
                    alt="Show/Hide Password"
                  />
                </button>
              </div>
              {/* Display password error if there's an issue */}
              {passwordError && <p className="password-error">{passwordError}</p>}
            </div>

            {/* Disable the button if the form is not valid */}
            <button
              type="submit"
              className="form-button"
              disabled={!isFormValid} // Button is disabled based on form validation
            >
              Signup
            </button>
          </form>
          <p className="form-text">
            Already have an account? <Link to="/login" className="form-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
