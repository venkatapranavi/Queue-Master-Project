import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './Home.css';


const Home = () => {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>
          📲 <strong>QueueMaster</strong>
        </div>
        <div className="header-button-group">
          <button className="employee-link" onClick={() => navigate('/employee-login')}>
            Employee Login
          </button>
          <button className="employee-link" onClick={() => navigate('/admin-dashboard')}>
            Admin Dashboard
          </button>
        </div>
      </header>

      <main className="main-content">
        <h1 className="headline">Skip The Line, Save Your Time</h1>
        <p className="subtext">
          Join the queue virtually and get notified when it's your turn. No more standing in long lines!
        </p>

        <div className="button-group">
          <button className="primary-button" onClick={() => navigate('/join')}>Join Queue Now</button>
          <button className="secondary-button" onClick={() => navigate('/status')}>Check Queue Status</button>
        </div>

        <div className="qr-section">
          <p>Try scanning our demo QR code:</p>
          <QRCodeCanvas
            value={`https://strong-travesseiro-eef607.netlify.app/join`}
            size={180}
            level="H"
            includeMargin={true}
            className="qr-image"
          />
          <p className="qr-hint">Scan with your phone camera to go to the Join Queue page</p>
        </div>

        <div className="demo-toggle-container">
          <button className="toggle-demo-button" onClick={() => setShowDemo(!showDemo)}>
            {showDemo ? 'Hide Demo' : 'See How It Works'}
          </button>

          {showDemo && (
            <div className="demo-cards-container">
              <div className="demo-card">
                <div className="demo-icon">🔳</div>
                <h3 className="demo-title">Scan & Register</h3>
                <p className="demo-subtitle">Scan the QR code at the location and register with your details</p>
                <p className="demo-text">
                  Enter your name, phone number, and email. We'll send you an OTP to verify your identity.
                </p>
              </div>
              <div className="demo-card">
                <div className="demo-icon">🕒</div>
                <h3 className="demo-title">Track Your Position</h3>
                <p className="demo-subtitle">Monitor your position in the queue in real-time</p>
                <p className="demo-text">
                  Check your current position and estimated waiting time from anywhere.
                </p>
              </div>
              <div className="demo-card">
                <div className="demo-icon">🔔</div>
                <h3 className="demo-title">Get Notified</h3>
                <p className="demo-subtitle">Receive alerts when it's almost your turn</p>
                <p className="demo-text">
                  We'll send you SMS and email notifications when you're next in line.
                </p>
              </div>
            </div>
          )}
        </div>
        <section className="why-container">
          <h2 className="why-heading">Why Choose QueueMaster?</h2>
          <div className="why-box">
            <div className="why-row">
              <div className="why-item">
                <div className="why-icon">🕒</div>
                <div>
                  <h4 className="why-title">Save Time</h4>
                  <p className="why-text">
                    No more standing in physical queues. Do something productive while you wait.
                  </p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon">👥</div>
                <div>
                  <h4 className="why-title">Fair Allocation</h4>
                  <p className="why-text">
                    Our smart algorithm ensures fair distribution across all counters.
                  </p>
                </div>
              </div>
            </div>
            <div className="why-row">
              <div className="why-item">
                <div className="why-icon">🔔</div>
                <div>
                  <h4 className="why-title">Timely Notifications</h4>
                  <p className="why-text">
                    Get SMS and email alerts when it's your turn.
                  </p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon">🔳</div>
                <div>
                  <h4 className="why-title">Easy Access</h4>
                  <p className="why-text">
                    Just scan a QR code to join the queue – no app installation required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;