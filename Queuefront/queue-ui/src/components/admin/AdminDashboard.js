// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("employees");
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/queue/all`).then((res) => setCustomers(res.data));
    axios.get(`${process.env.REACT_APP_API_URL}/api/employee/all-for-admin`).then((res) => setEmployees(res.data));
  }, []);

  const handleAssignRedirect = (emp) => {
    navigate("/assign-counter", { state: { employee: emp } });
  };

  const handleChangeRedirect = (emp) => {
    navigate("/update-counter", { state: { employee: emp } });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleRemoveEmployee = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/employee/delete/${id}`);
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        alert("Employee removed successfully.");
    } catch (err) {
        console.error(err);
        alert("Failed to remove employee.");
    }
    };

  return (
    <div className="admin-container">
        <button className="back-btn" onClick={handleBack}>
            ⬅ Back
        </button>
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-header">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            All Customers
          </button>
          <button
            className={`tab-button ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            All Employees
          </button>
        </div>
        <div>
          {activeTab === "customers" && <div className="underline customers"></div>}
          {activeTab === "employees" && <div className="underline employees"></div>}
        </div>
      </div>

      <div className="admin-content">
        {activeTab === "customers" && (
          <div className="vertical-list customers-list">
            {customers.map((cust) => (
              <div key={cust.tokenNumber} className="list-item">
                <p><strong>Name:</strong> {cust.fullName}</p>
                <p><strong>Phone:</strong> {cust.phoneNumber}</p>
                <p><strong>Email:</strong> {cust.email}</p>
                <p><strong>Token:</strong> {cust.tokenNumber}</p>
                <p><strong>Counter:</strong> {cust.counterAssigned}</p>
                <p><strong>Status:</strong> {cust.status}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "employees" && (
          <div className="employee-section">
            <div className="employee-header-bar">
              <h2>All Employees</h2>
              <button
                className="assign-btn-top"
                onClick={() => handleAssignRedirect(employees[0])}
              >
                Assign New Counter
              </button>
            </div>

            <div className="vertical-list employees-list">
              {employees.map((emp) => (
                <div key={emp.id} className="list-item">
                  <div className="employee-header">
                    <div>
                      <p><strong>ID:</strong> {emp.id}</p>
                      <p><strong>Username:</strong> {emp.username}</p>
                      <p>
                        <strong>Counter Number:</strong> {emp.counterNumber || "Not Assigned"} {" "}
                        <button
                          className="change-counter-btn"
                          onClick={() => handleChangeRedirect(emp)}
                        >
                          Update Counter
                        </button>
                      </p>
                    </div>
                    <button
                        className="remove-employee-btn"
                        onClick={() => handleRemoveEmployee(emp.id)}
                        >
                            Remove Employee
                        </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;