import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckStatus.css';

const CheckStatus = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/queue/status/${token}`);
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      } else {
        setStatus({ error: 'Invalid token number.' });
      }
    } catch (error) {
      setStatus({ error: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="check-status-container">
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="logo" onClick={() => navigate('/')}>📲 <strong>QueueMaster</strong></div>
      </header>

      <div className="status-card">
        <h2>Check Your Queue Status</h2>
        <p className="form-subtext">Enter your token number below</p>

        <input
          type="number"
          placeholder="Enter your token number"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button className="submit-button" onClick={fetchStatus}>Check Status</button>

        {status && (
          <div className="status-result">
            {status.error ? (
              <p className="error">{status.error}</p>
            ) : (
              <div>
                <p><strong>Name:</strong> {status.fullName}</p>
                <p><strong>Status:</strong> {status.status}</p>
                <p><strong>Counter:</strong> {status.counterAssigned}</p>
                <p><strong>Joined:</strong> {new Date(status.createdAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;