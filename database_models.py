from sqlalchemy.orm import declarative_base
from sqlalchemy import Column,String,Integer,Text,Enum as sqlEnum,Boolean
from enum import Enum



Base = declarative_base()

class Status(str,Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    IN_REVIEW = 'in_review'
    COMPLETED = "completed"

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer,primary_key=True,index=True)
    title = Column(String)
    description = Column(Text)
    status = Column(sqlEnum(Status),default=Status.TODO)





class UserRole(str,Enum):
    ADMIN = "admin" 
    MANAGER = "manager"
    USER = "user"


class User(Base):
    __tablename__="users"
    id = Column(Integer,primary_key=True,index=True)
    username = Column(String,unique=True)
    email = Column(String,unique=True)
    password = Column(String)
    role = Column(sqlEnum(UserRole),default=UserRole.USER)
    is_active = Column(Boolean,default=True)



