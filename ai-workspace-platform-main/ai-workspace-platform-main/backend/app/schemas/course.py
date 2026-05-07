from pydantic import BaseModel

class CourseSchema(BaseModel):
    id: int
    name: str
