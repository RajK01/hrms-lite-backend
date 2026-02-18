from sqlalchemy.orm import Session
from backend.models import Employee, Attendance
from backend.schemas import EmployeeCreate, AttendanceCreate

def create_employee(db: Session, employee: EmployeeCreate):
    db_emp = Employee(
        emp_id=employee.emp_id,
        name=employee.name,
        department=employee.department
    )
    db.add(db_emp)
    db.commit()
    db.refresh(db_emp)
    return db_emp

def get_employees(db: Session):
    return db.query(Employee).all()

def delete_employee(db: Session, emp_id: str):
    emp = db.query(Employee).filter(Employee.emp_id == emp_id).first()
    if emp:
        db.delete(emp)
        db.commit()
        return True
    return False

def mark_attendance(db: Session, att: AttendanceCreate):
    db_att = Attendance(
        emp_id=att.emp_id,
        date=att.date,
        status=att.status
    )
    db.add(db_att)
    db.commit()
    db.refresh(db_att)
    return db_att

def get_attendance(db: Session, emp_id: str):
    return db.query(Attendance).filter(Attendance.emp_id == emp_id).all()
