import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [nextCustomer, setNextCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [isServed, setIsServed] = useState(false); // Track if customer was served

  const peekCustomer = useCallback(async () => {
    setLoading(true);
    setMessage('');
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/employee/peek-next-customer?counterNumber=${state.counterNumber}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        }
      );

      if (response.status === 304) {
        setNextCustomer(null);
        setMessage("No new customer in queue.");
      } else if (response.ok) {
        const data = await response.json();
        if (data) {
          setNextCustomer(data);
          setIsServed(false); // Reset when new customer comes
          setMessage('Next customer loaded.');
        } else {
          setNextCustomer(null);
          setMessage("No customers waiting at your counter.");
        }
      } else {
        setNextCustomer(null);
        setError("No customer found for your counter.");
      }
    } catch (error) {
      console.error("Error peeking next customer:", error);
      // Do not set error to avoid redundant message
    } finally {
      setLoading(false);
    }
  }, [state.counterNumber]);

  useEffect(() => {
    peekCustomer();
  }, [peekCustomer]);

  const markAsServed = useCallback(async () => {
    if (!nextCustomer) return;
    setLoading(true);
    setMessage('');
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/employee/next-customer?counterNumber=${state.counterNumber}`,
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Served customer:", data);
        setNextCustomer(prev => ({
          ...prev,
          status: 'SERVED'
        }));
        setIsServed(true);
        setMessage('Customer marked as served.');
      } else {
        setError('Could not mark customer as served.');
      }
    } catch (error) {
      console.error('Error serving customer:', error);
      setError('Error while marking customer as served.');
    } finally {
      setLoading(false);
    }
  }, [state.counterNumber, nextCustomer]);

  const sendEmail = useCallback(async () => {
    if (!nextCustomer || !nextCustomer.tokenNumber || !isServed) {
      setMessage("You can only send email after serving the customer.");
      return;
    }

    setLoading(true);
    setMessage('');
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/queue/complete/${nextCustomer.tokenNumber}`,
        {
          method: 'PUT',
        }
      );

      if (response.ok) {
        console.log(`Email sent for token: ${nextCustomer.tokenNumber}`);
        setMessage('Email sent successfully.');
      } else {
        setError('Failed to send email.');
      }
    } catch (error) {
      console.error('Email error:', error);
      setError('Something went wrong while sending email.');
    } finally {
      setLoading(false);
    }
  }, [nextCustomer, isServed]);

  const goToQueueList = async () => {
    setLoading(true);
    setMessage('');
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/employee/queue-list?counterNumber=${state.counterNumber}`
      );
      if (response.ok) {
        const queueList = await response.json();
        navigate('/queue-list', {
          state: {
            counterNumber: state.counterNumber,
            queueList: queueList
          }
        });
      } else {
        setError('Failed to load queue list.');
      }
    } catch (error) {
      console.error('Error fetching queue list:', error);
      setError('Could not load queue list.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Employee Dashboard</h2>
        <button onClick={goToQueueList}>Queue List</button>
      </nav>

      <div className="employee-info">
        <h3>{state.message}</h3>
        <p><strong>Username:</strong> {state.username}</p>
        <p><strong>Assigned Counter:</strong> {state.counterNumber}</p>
      </div>

      <hr />

      <div className="dashboard-content">
        <h4>Next Waiting Customer</h4>

        {loading && <p>Loading...</p>}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        {nextCustomer ? (
          <div className="customer-details">
            <p><strong>Name:</strong> {nextCustomer.fullName}</p>
            <p><strong>Token Number:</strong> {nextCustomer.tokenNumber}</p>
            <p><strong>Status:</strong> {nextCustomer.status}</p>
            <p><strong>Joined At:</strong> {new Date(nextCustomer.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          !loading && <p>No customer is currently waiting.</p>
        )}

        <div className="button-group">
          <button
            className="mark-served-button"
            onClick={markAsServed}
            disabled={!nextCustomer || loading || nextCustomer.status === 'SERVED'}
          >
            Mark as Served
          </button>

          <button
            className="send-email-button"
            onClick={sendEmail}
            disabled={!nextCustomer || loading || !isServed}
          >
            Send Email
          </button>

          <button
            className="next-button"
            onClick={peekCustomer}
            disabled={loading}
          >
            Next Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;