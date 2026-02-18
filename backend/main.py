from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
import models
import crud
from schemas import EmployeeCreate, AttendanceCreate
from fastapi.middleware.cors import CORSMiddleware
from backend.database import SessionLocal, engine, Base
from backend import models, crud
from backend.schemas import EmployeeCreate, AttendanceCreate


# -------------------------
# App Initialization
# -------------------------

app = FastAPI()

# Enable CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
Base.metadata.create_all(bind=engine)


# -------------------------
# Dependency: DB Session
# -------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# Routes
# -------------------------

@app.get("/")
def home():
    return {"message": "HRMS Backend Running"}


# --- Employee Routes ---

@app.post("/employees")
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, employee)


@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_employee(db, emp_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Deleted successfully"}


# --- Attendance Routes ---

@app.post("/attendance")
def add_attendance(att: AttendanceCreate, db: Session = Depends(get_db)):
    return crud.mark_attendance(db, att)


@app.get("/attendance/{emp_id}")
def get_attendance(emp_id: str, db: Session = Depends(get_db)):
    return crud.get_attendance(db, emp_id)

