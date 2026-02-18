from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware  # <--- Add this
from backend.database import SessionLocal, engine, Base
from backend import models, crud
from backend.schemas import EmployeeCreate, AttendanceCreate

app = FastAPI()

models.Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "HRMS Backend Running"}

# ---------------------------------------------------
# 📌 DELETE FIRST — Before GET routes to avoid shadowing
# ---------------------------------------------------
@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: str, db: Session = Depends(get_db)):
    result = crud.delete_employee(db, emp_id)
    if not result:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Deleted"}

# ---------------------------------------------------
# 📌 CREATE EMPLOYEE
# ---------------------------------------------------
@app.post("/employees")
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, employee)

# ---------------------------------------------------
# 📌 LIST EMPLOYEES
# ---------------------------------------------------
@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

# ---------------------------------------------------
# 📌 ATTENDANCE ROUTES
# ---------------------------------------------------
@app.post("/attendance")
def add_attendance(att: AttendanceCreate, db: Session = Depends(get_db)):
    return crud.mark_attendance(db, att)

@app.get("/attendance/{emp_id}")
def get_attendance(emp_id: str, db: Session = Depends(get_db)):
    return crud.get_attendance(db, emp_id)


