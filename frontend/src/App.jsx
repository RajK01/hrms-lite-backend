import React, { useState, useEffect } from "react";

function App() {
  const [employee, setEmployee] = useState({ employee_id: "", full_name: "", email: "", department: "" });
  const [attendance, setAttendance] = useState({ employee_id: "", status: "Present", date: new Date().toISOString().split('T')[0] });
  const [employeeList, setEmployeeList] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("https://hrms-lite-back.onrender.com/employees");
      const data = await res.json();
      setEmployeeList(data);
    } catch (err) { console.error("Fetch failed", err); }
  };

  const fetchAllAttendance = async () => {
    try {
      const res = await fetch("https://hrms-lite-back.onrender.com/attendance");
      const data = await res.json();
      setHistory(data);
    } catch (err) { console.error("Attendance fetch failed", err); }
  };

  const saveEmployee = async () => {
    if (!employee.employee_id || !employee.full_name || !employee.email) {
      alert("Please fill the required fields!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employee.email)) {
      alert("Please enter a valid email address!");
      return;
    }
    const res = await fetch("https://hrms-lite-back.onrender.com/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    if (res.ok) {
      alert("Employee Added!");
      setEmployee({ employee_id: "", full_name: "", email: "", department: "" });
      fetchEmployees();
    } else {
      alert("Error: ID/Email might already exist.");
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Delete this employee?")) {
      await fetch(`https://hrms-lite-back.onrender.com/employees/${id}`, { method: "DELETE" });
      fetchEmployees();
    }
  };

  const markAttendance = async () => {
    const res = await fetch("https://hrms-lite-back.onrender.com/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendance),
    });
    if (res.ok) {
      alert("Attendance Marked!");
      fetchAllAttendance(); // Refresh attendance table
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAllAttendance(); // fetch all attendance on page load
  }, []);

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <nav style={navStyle}>
        <div style={navContent}>
          <h1 style={{ margin: 0, fontSize: "22px", color: "#2563eb" }}>🚀 HRMS <span style={{ fontWeight: 300, color: "#64748b" }}>Lite</span></h1>
          <div style={{ color: "#64748b", fontWeight: "500" }}>{new Date().toDateString()}</div>
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <div style={dashboardWrapper}>
        <div style={contentGrid}>

          {/* LEFT COLUMN */}
          <div style={columnStyle}>
            <section style={cardStyle}>
              <h3 style={cardTitle}>Add New Employee</h3>
              <div style={formGroup}>
                <input placeholder="Employee ID" value={employee.employee_id} onChange={(e) => setEmployee({ ...employee, employee_id: e.target.value })} style={inputStyle} />
                <input placeholder="Full Name" value={employee.full_name} onChange={(e) => setEmployee({ ...employee, full_name: e.target.value })} style={inputStyle} />
                <input placeholder="Email Address" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} style={inputStyle} />
                <input placeholder="Department" value={employee.department} onChange={(e) => setEmployee({ ...employee, department: e.target.value })} style={inputStyle} />
                <button onClick={saveEmployee} style={primaryBtn}>Onboard Employee</button>
              </div>
            </section>

            <section style={cardStyle}>
              <h3 style={cardTitle}>Mark Attendance</h3>
              <div style={formGroup}>
                <input placeholder="Emp ID" value={attendance.employee_id} onChange={(e) => setAttendance({ ...attendance, employee_id: e.target.value })} style={inputStyle} />
                <select value={attendance.status} onChange={(e) => setAttendance({ ...attendance, status: e.target.value })} style={inputStyle}>
                  <option value="Present">✅ Present</option>
                  <option value="Absent">❌ Absent</option>
                </select>
                <input type="date" value={attendance.date} onChange={(e) => setAttendance({ ...attendance, date: e.target.value })} style={inputStyle} />
                <button onClick={markAttendance} style={secondaryBtn}>Log Status</button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div style={columnStyle}>
            <section style={cardStyle}>
              <h3 style={cardTitle}>Employee Directory</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                  <thead>
                    <tr style={tableHeaderRow}>
                      <th style={thStyle}>ID</th>
                      <th style={thStyle}>NAME</th>
                      <th style={thStyle}>EMAIL</th>
                      <th style={thStyle}>DEPT</th>
                      <th style={thStyle}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.map((emp) => (
                      <tr key={emp.employee_id} style={tableRowStyle}>
                        <td style={tdStyle}>{emp.employee_id}</td>
                        <td style={tdStyle}><strong>{emp.full_name}</strong></td>
                        <td style={tdStyle}><strong>{emp.email}</strong></td>
                        <td style={tdStyle}><span style={badgeStyle}>{emp.department}</span></td>
                        <td style={tdStyle}>
                          <button onClick={() => deleteEmployee(emp.employee_id || emp.id)} style={deleteBtn}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section style={cardStyle}>
              <h3 style={cardTitle}>Attendance Record</h3>
              <div style={{ overflowX: "auto" }}>
                {history.length > 0 ? (
                  <table style={tableStyle}>
                    <thead>
                      <tr style={tableHeaderRow}>
                        <th style={thStyle}>Employee ID</th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((h, i) => (
                        <tr key={i} style={tableRowStyle}>
                          <td style={tdStyle}>{h.employee_id}</td>
                          <td style={tdStyle}>{h.date}</td>
                          <td style={{ ...tdStyle, color: h.status === 'Present' ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                            {h.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ fontSize: "13px", color: "#94a3b8" }}>No attendance records found.</p>
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- CSS-IN-JS STYLES (UNCHANGED) ---
const containerStyle = { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column" };
const navStyle = { backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "15px 0", display: "flex", justifyContent: "center", width: "100%" };
const columnStyle = { display: "flex", flexDirection: "column", gap: "30px" };
const cardStyle = { backgroundColor: "#ffffff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0" };
const cardTitle = { margin: "0 0 20px 0", fontSize: "16px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px" };
const formGroup = { display: "flex", flexDirection: "column", gap: "15px" };
const inputStyle = { padding: "12px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", backgroundColor: "#fff", color: "#1e293b", outline: "none", transition: "border 0.2s" };
const primaryBtn = { padding: "12px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" };
const secondaryBtn = { ...primaryBtn, backgroundColor: "#4f46e5" };
const dashboardWrapper = { padding: "20px", width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "center" };
const contentGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", width: "100%", maxWidth: "1600px" };
const navContent = { width: "100%", maxWidth: "1600px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" };
const thStyle = { padding: "12px 15px", fontSize: "12px", color: "#94a3b8", textAlign: "left", textTransform: "uppercase", letterSpacing: "1px" };
const tableStyle = { width: "100%", borderCollapse: "collapse" };
const tdStyle = { padding: "16px 8px", fontSize: "14px", color: "#1e293b", borderBottom: "1px solid #f1f5f9" };
const tableHeaderRow = { borderBottom: "2px solid #f8fafc" };
const tableRowStyle = { verticalAlign: "middle" };
const badgeStyle = { backgroundColor: "#eff6ff", color: "#1e40af", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" };
const deleteBtn = { color: "#f43f5e", border: "none", background: "none", fontWeight: "600", cursor: "pointer", fontSize: "13px" };

export default App;
