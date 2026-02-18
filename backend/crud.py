from sqlalchemy.orm import Session
from models import Employee, Attendance
from schemas import EmployeeCreate, AttendanceCreate
from backend import models
from backend.database import SessionLocal

def create_employee(db: Session, emp: EmployeeCreate):
    employee = Employee(**emp.dict())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def get_employees(db: Session):
    return db.query(Employee).all()

def delete_employee(db: Session, emp_id: str):
    emp = db.query(Employee).filter(Employee.employee_id == emp_id).first()
    if emp:
        db.delete(emp)
        db.commit()
        return True
    return False

def mark_attendance(db: Session, att: AttendanceCreate):
    record = Attendance(**att.dict())
    db.add(record)
    db.commit()
    return record

def get_attendance(db: Session, emp_id: str):
    return db.query(Attendance).filter(Attendance.employee_id == emp_id).all()

