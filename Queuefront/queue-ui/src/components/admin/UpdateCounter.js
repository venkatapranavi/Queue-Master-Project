// UpdateCounter.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AssignCounter.css"; // Reuse shared styling

function UpdateCounter() {
  const location = useLocation();
  const navigate = useNavigate();

  const employee = location.state?.employee;
  const [counterNumber, setCounterNumber] = useState(employee?.counterNumber || "");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/employee/update-counter/${employee.id}?counterNumber=${counterNumber}`
      );
      setStatus(`Counter updated successfully for ${employee.username}.`);
    } catch (err) {
      console.error(err);
      setStatus(" Failed to update counter. Please try again.");
    }
  };

  const goBack = () => {
    navigate("/admin-dashboard", { state: { tab: "employees" } });
  };

  return (
    <div className="assign-page">
      <div className="assign-box">
        <button className="back-btn" onClick={goBack}>⬅ Back</button>
        <button className="close-btn" onClick={goBack}>×</button>
        <h2>Update Counter</h2>

        <label><strong>Counter Number</strong></label>
        <input
          type="text"
          placeholder="Enter counter number"
          value={counterNumber}
          onChange={(e) => setCounterNumber(e.target.value)}
          className="assign-input"
        />

        <button className="submit-btn" onClick={handleUpdate}>Update Counter</button>

        {status && <div className="status-msg">{status}</div>}
      </div>
    </div>
  );
}

export default UpdateCounter;
