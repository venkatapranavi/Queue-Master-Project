import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './QueueListPage.css';

const QueueListPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const queueList = state?.queueList || [];

  return (
    <div className="queue-list-container">
      <h2>Queue List for Counter {state.counterNumber}</h2>
      <button onClick={() => navigate(-1)}>Back</button>

      {queueList.length > 0 ? (
        <table className="queue-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Name</th>
              <th>Status</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {queueList.map((entry) => (
              <tr key={entry.tokenNumber}>
                <td>{entry.tokenNumber}</td>
                <td>{entry.fullName}</td>
                <td>{entry.status}</td>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers currently in queue.</p>
      )}
    </div>
  );
};

export default QueueListPage;