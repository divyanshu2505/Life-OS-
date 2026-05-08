from pydantic import BaseModel

class DocumentSchema(BaseModel):
    id: int
    name: str
