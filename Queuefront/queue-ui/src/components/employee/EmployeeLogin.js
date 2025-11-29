import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeLogin.module.css';

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/employee/login`,
        null,
        { params: { username, password } }
      );
      navigate('/dashboard', { state: response.data });
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('Invalid username or password');
      } else {
        setMessage('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="logo" onClick={() => navigate('/')}>
          <span role="img" aria-label="qr">📲</span>
          <span className="logo-text">Queue<span className="highlight">Master</span></span>
        </div>
      </header>

      <div className="form-container">
        <div className="form-card">
          <h2>Employee Login</h2>
          <p className="subtext">Sign in to access the employee dashboard</p>
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="primary-button">Sign In</button>
          </form>
          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;