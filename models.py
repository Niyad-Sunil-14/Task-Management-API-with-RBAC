from pydantic import BaseModel,Field
from database_models import Status

class Task(BaseModel):
    id : int
    title : str
    description : str = Field(max_length=2000)
    status : Status = Status.TODO