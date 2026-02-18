from pydantic import BaseModel
from datetime import date

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: str
    department: str

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str
