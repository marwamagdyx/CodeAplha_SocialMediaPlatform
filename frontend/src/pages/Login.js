import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import BackgroundImage from '../assets/Img.jpg';
import CheckIcon from '../assets/check-icon.svg'; 
import ShowPasswordIcon from '../assets/show-password-icon.svg'; 
import HidePasswordIcon from '../assets/hide-password-icon.svg';
import { Link } from 'react-router-dom';
import '../register.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
};
useEffect(() => {
  setIsFormValid(
      email.trim() !== '' && password.trim() !== ''
  );
}, [email, password]);  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token); // Store JWT token
      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="login-container">
      <div
        className="left-section"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
      </div>

      <div className="right-section">
        <div className="form-containerLogin">
          <div className='titleContainer'>
            <h2 className="form-title">Log in to your account</h2>
            <h2 className="form-subtitle">Hello again! Log in and get productive.</h2>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
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
                <label className='necessary'> *</label>
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
            </div>
            <button
              type="submit"
              className="form-button"
              disabled={!isFormValid} 
            >
              Log in
            </button>
          </form>
          <div className='idkkkk'>
            <p className="form-text">
              Don't have an account? <Link to="/register" className="form-link">Signup</Link>
            </p>
            <a href="" className="form-link">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
