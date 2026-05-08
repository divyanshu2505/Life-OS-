from pydantic import BaseModel

class PostSchema(BaseModel):
    id: int
    title: str
