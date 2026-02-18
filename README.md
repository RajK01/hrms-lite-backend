# HRMS Lite 🚀
### A Lightweight Human Resource Management System

HRMS Lite is a streamlined internal tool designed for HR Administrators to manage employee records and track daily attendance with ease. Built with a focus on clean architecture, type safety, and responsive design.

---

## 🔗 Live Links
- **Live Demo:** [Insert Vercel URL Here]
- **Backend API Docs:** [Insert Render URL Here]/docs
- **Frontend Repository:** [Insert Link]
- **Backend Repository:** [Insert Link]

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite):** For a blazing fast development experience and optimized builds.
- **Tailwind CSS:** For a modern, professional, and responsive UI.
- **Axios:** For robust API communication.
- **React Router:** For seamless single-page navigation.

### Backend
- **FastAPI (Python):** High-performance framework with automatic Swagger documentation.
- **SQLAlchemy:** SQL Toolkit and ORM for clean database interactions.
- **SQLite:** Lightweight, file-based database (Perfect for Lite applications).
- **Pydantic:** Data validation and settings management using Python type annotations.

---

## ✨ Features
- **Employee Management:** - Add new employees with unique IDs.
    - View a comprehensive directory of all staff.
    - Delete records with immediate state updates.
- **Attendance Tracking:**
    - Mark attendance (Present/Absent) for specific dates.
    - View historical attendance logs per employee.
- **Validation:** Server-side checks for duplicate IDs and valid email formats.

---

## 🚀 Local Setup Instructions

### Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate it: 
   - Windows: `venv\Scripts\activate` 
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Start the server: `uvicorn main:app --reload`

### Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add: `VITE_API_URL=http://localhost:8000`
4. Start the app: `npm run dev`

---

## 📝 Assumptions & Limitations
- **Security:** As per requirements, authentication is omitted (Single Admin Use Case).
- **Data Persistence:** Uses SQLite for zero-config setup. For high-scale production, PostgreSQL is recommended.
- **Scope:** Focused purely on Core Employee and Attendance modules as per the 6-hour sprint goal.
