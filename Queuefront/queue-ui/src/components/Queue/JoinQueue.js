import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinQueue.css';

const JoinQueue = () => {
  const [formData, setFormData] = useState({ fullName: '', phoneNumber: '', email: '' });
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/queue/join-queue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccess(data);
    } else {
      setSuccess({ error: 'Failed to join queue.' });
    }
  };

  return (
    <div className="join-queue-container">
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="logo" onClick={() => navigate('/')}>📲 <strong>QueueMaster</strong></div>
      </header>

      <div className="form-card">
        <h2>Join the Queue</h2>
        <p className="form-subtext">Enter your details to get a token number</p>

        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </label>

          <button type="submit" className="submit-button">Submit</button>
        </form>

        {success && (
          <div className="result">
            {success.error ? (
              <p className="error">{success.error}</p>
            ) : (
              <p>
                Success! Your token is <strong>{success.tokenNumber}</strong> at counter{' '}
                <strong>{success.counterAssigned}</strong>.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinQueue;