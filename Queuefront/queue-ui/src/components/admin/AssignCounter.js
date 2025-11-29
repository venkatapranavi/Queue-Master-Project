// AssignCounter.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AssignCounter.css";

function AssignCounter() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [counterNumber, setCounterNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleAssign = async () => {
    try {
      const payload = { username, counterNumber };
      await axios.post(`${process.env.REACT_APP_API_URL}/api/employee/add`, payload);
      setStatus(`Counter "${counterNumber}" assigned to user "${username}" successfully.`);
    } catch (error) {
      console.error(error);
      setStatus("Failed to assign counter. Please try again.");
    }
  };

  const goBack = () => {
    navigate("/admin-dashboard", { state: { tab: "employees" } }); // Redirect only to employees tab
  };

  return (
    <div className="assign-page">
      <div className="assign-box">
        <button className="back-btn" onClick={goBack}>⬅ Back</button>
        <button className="close-btn" onClick={goBack}>×</button>
        <h2>Assign Counter</h2>

        <label><strong>Username</strong></label>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="assign-input"
        />

        <label><strong>Counter Number</strong></label>
        <input
          type="text"
          placeholder="Enter Counter Number"
          value={counterNumber}
          onChange={(e) => setCounterNumber(e.target.value)}
          className="assign-input"
        />

        <button className="submit-btn" onClick={handleAssign}>Add Counter</button>

        {status && <div className="status-msg">{status}</div>}
      </div>
    </div>
  );
}

export default AssignCounter;
