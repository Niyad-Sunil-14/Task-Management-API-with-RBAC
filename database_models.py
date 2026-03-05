from sqlalchemy.orm import declarative_base
from sqlalchemy import Column,String,Integer,Text,Enum as sqlEnum
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
