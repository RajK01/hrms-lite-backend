## HRMS Lite – Lightweight Human Resource Management System

A streamlined, full-stack **Human Resource Management System (HRMS)** designed to help administrators manage employee records and track daily attendance efficiently.

---

### 🚀 Live Links
- **Live Application:** [https://hrms-lite-backend-ten.vercel.app/](https://hrms-lite-backend-ten.vercel.app/)  
- **GitHub Repository:** [https://github.com/RajK01/hrms-lite-backend](https://github.com/RajK01/hrms-lite-backend)  
- **Hosted Backend API:** [https://hrms-lite-back.onrender.com/](https://hrms-lite-back.onrender.com/)

---

### 📝 Project Overview
**HRMS Lite** is a professional internal tool built to handle essential HR operations, focusing on:

1. **Employee Management**  
   - Register new staff  
   - View a complete employee directory  
   - Delete outdated or inactive records  

2. **Attendance Tracking**  
   - Mark daily employee attendance (Present/Absent)  
   - View attendance history with trends over time  

The system emphasizes a **clean UI, stable performance, and production-ready deployment**.

---

### 🛠️ Tech Stack
- **Frontend:** React.js (Vite)  
- **Styling:** CSS-in-JS (Dashboard-centric)  
- **Backend:** Python (FastAPI)  
- **Database:** SQLite / SQLAlchemy  
- **Deployment:** Vercel (Frontend) & Render (Backend)  

---

### ✨ Features
- **Employee Directory:** View all employees with ID, name, email, and department  
- **Attendance History:** Searchable logs in a tabular format  
- **Server-Side Validation:** Email format checks and prevention of duplicate Employee IDs  
- **Responsive Dashboard:** Professional two-column layout optimized for admin use  

---

### ⚙️ Running Locally

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/RajK01/hrms-lite-backend.git
cd hrms-lite-backend

2️⃣ Backend Setup
⭐ STEP 2 — BACKEND SETUP (FastAPI)
cd backend

python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy pydantic email-validator

pip install -r requirements.txt
uvicorn main:app --reload

Backend available at: http://localhost:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend available at: http://localhost:5173

```
### Assumptions & Limitations
   - Single Administrator: The system is designed for use by a single admin; authentication and multi-user roles are currently out of scope.
   - Manual ID Management: Unique Employee IDs are expected to be managed and entered manually by the administrator.
   - Local Persistence: Data is stored using a local SQLite database file, which is ideal for lightweight management but not designed for high-concurrency enterprise use.
   - Attendance Frequency: The system assumes one attendance log per employee per calendar day.
   - Internet Connectivity: As the frontend and backend are hosted on separate platforms (Vercel and Render), a stable internet connection is required for the live version to sync data.
