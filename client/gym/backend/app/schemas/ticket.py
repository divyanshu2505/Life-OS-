from pydantic import BaseModel

class TicketSchema(BaseModel):
    id: int
    title: str
