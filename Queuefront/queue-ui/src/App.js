import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeLogin from './components/employee/EmployeeLogin';
import QueueListPage from './components/employee/QueueListPage';
import CheckStatus from './components/Queue/CheckStatus';
import JoinQueue from './components/Queue/JoinQueue';
import Home from './components/Queue/Home';
import AssignCounter from './components/admin/AssignCounter';
import UpdateCounter from './components/admin/UpdateCounter';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<EmployeeDashboard />} />
          <Route path="/join" element={<JoinQueue />} />
          <Route path="/status" element={<CheckStatus />} />
          <Route path="/queue-list" element={<QueueListPage />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/assign-counter" element={<AssignCounter />} />
          <Route path="/update-counter" element={<UpdateCounter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;