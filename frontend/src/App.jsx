import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee, markAttendance, getAttendance } from "./api";

function App() {
  const [view, setView] = useState("employees"); // Toggle between 'employees' and 'attendance'
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedEmpForAttendance, setSelectedEmpForAttendance] = useState("");
  
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const [attForm, setAttForm] = useState({
    status: "Present",
    date: new Date().toISOString().split('T')[0]
  });

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) { console.error("Fetch error", err); }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleAdd = async () => {
    if (!form.employee_id || !form.full_name || !form.email || !form.department) {
      alert("Please fill all fields"); return;
    }
    try {
      await addEmployee(form);
      await fetchEmployees();
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      alert("Employee Added! ✔");
    } catch (err) { alert("Error adding employee"); }
  };

  const handleMarkAttendance = async () => {
    if (!selectedEmpForAttendance) return alert("Select an employee first");
    try {
      await markAttendance({
        employee_id: selectedEmpForAttendance,
        date: attForm.date,
        status: attForm.status
      });
      alert("Attendance Marked! 📝");
      // Refresh local list for that employee
      const res = await getAttendance(selectedEmpForAttendance);
      setAttendanceRecords(res.data);
    } catch (err) { alert("Error marking attendance"); }
  };

  const handleFetchAttendance = async (id) => {
    setSelectedEmpForAttendance(id);
    const res = await getAttendance(id);
    setAttendanceRecords(res.data);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", color: "white", backgroundColor: "#1a1a1a", minHeight: "100vh" }}>
      
      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <button onClick={() => setView("employees")} style={view === "employees" ? activeTab : tabStyle}>👥 Employees</button>
        <button onClick={() => setView("attendance")} style={view === "attendance" ? activeTab : tabStyle}>📅 Attendance</button>
      </div>

      {view === "employees" ? (
        <>
          <h1>Manage Employees</h1>
          <div style={gridStyle}>
            <input placeholder="ID" value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} style={inputStyle} />
            <input placeholder="Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} style={inputStyle} />
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
            <input placeholder="Dept" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} style={inputStyle} />
          </div>
          <button onClick={handleAdd} style={buttonStyle}>Add Employee</button>

          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: "#333" }}>
                <th>ID</th><th>Name</th><th>Dept</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.employee_id}>
                  <td>{emp.employee_id}</td><td>{emp.full_name}</td><td>{emp.department}</td>
                  <td><button onClick={async () => { await deleteEmployee(emp.employee_id); fetchEmployees(); }} style={deleteBtn}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h1>Attendance Tracking</h1>
          <div style={gridStyle}>
            <select style={inputStyle} onChange={(e) => handleFetchAttendance(e.target.value)}>
              <option value="">Select Employee</option>
              {employees.map(emp => <option key={emp.employee_id} value={emp.employee_id}>{emp.full_name}</option>)}
            </select>
            <input type="date" value={attForm.date} onChange={(e) => setAttForm({...attForm, date: e.target.value})} style={inputStyle} />
            <select style={inputStyle} onChange={(e) => setAttForm({...attForm, status: e.target.value})}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <button onClick={handleMarkAttendance} style={buttonStyle}>Mark Attendance</button>

          <h2 style={{marginTop: "20px"}}>History for {selectedEmpForAttendance}</h2>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: "#333" }}><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {attendanceRecords.map((r, i) => (
                <tr key={i}><td>{r.date}</td><td>{r.status}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

// STYLES
const inputStyle = { padding: "10px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#222", color: "white" };
const gridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" };
const buttonStyle = { width: "100%", padding: "12px", background: "#646cff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" };
const tableStyle = { width: "100%", marginTop: "20px", borderCollapse: "collapse", textAlign: "left" };
const deleteBtn = { background: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" };
const tabStyle = { padding: "10px 20px", cursor: "pointer", background: "#333", color: "white", border: "none", borderRadius: "5px" };
const activeTab = { ...tabStyle, background: "#646cff" };

export default App;