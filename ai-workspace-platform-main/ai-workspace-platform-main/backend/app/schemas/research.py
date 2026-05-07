from pydantic import BaseModel

class ResearchSchema(BaseModel):
    id: int
    title: str
