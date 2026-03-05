from pydantic import BaseModel,Field,EmailStr
from database_models import Status,UserRole

class Task(BaseModel):
    id : int
    title : str
    description : str = Field(max_length=2000)
    status : Status = Status.TODO





#Register Model
class UserCreate(BaseModel):
    username : str
    email : EmailStr
    password : str = Field(min_length=8)


class UserOut(BaseModel):
    id:int
    username:str
    email:EmailStr
    role:UserRole
    is_active:bool

    class Config:
        from_attributes = True




#Login Model
class UserLogin(BaseModel):
    username:str
    password : str