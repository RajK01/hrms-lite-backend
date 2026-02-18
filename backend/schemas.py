from pydantic import BaseModel, EmailStr
from backend.models import Employee

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str

