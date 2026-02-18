from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    emp_id: str
    name: str
    role: str

class AttendanceCreate(BaseModel):
    emp_id: str
    date: str       # or date type
    status: str
