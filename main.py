#Task Management api with role based access

from fastapi import FastAPI,Depends
from database import session,engine
import database_models
from sqlalchemy.orm import Session
from models import Task

app = FastAPI()

database_models.Base.metadata.create_all(bind=engine)

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()



@app.get('/tasks')
def get_all_task(db:Session = Depends(get_db)):
    db_tasks = db.query(database_models.Task).all()
    return db_tasks


@app.post('/tasks')
def create_task(data:Task,db:Session = Depends(get_db)):
    if data:
        db.add(database_models.Task(**data.model_dump()))
        db.commit()
        return data
    

@app.get('/tasks/{id}')
def get_task_details(id:int,db:Session = Depends(get_db)):
    db_tasks = db.query(database_models.Task).filter(id == database_models.Task.id).first()
    if db_tasks:
        return db_tasks
    else:
        return f"No data found on id : {id}"


@app.put('/tasks/{id}')
def edit_task(id:int,data:Task,db:Session = Depends(get_db)):
    db_task = db.query(database_models.Task).filter(data.id == id).first()
    if db_task:
        db_task.title = data.title
        db_task.description = data.description
        db_task.status = data.status
        db.commit()
        return "Task Updated"
    return "Error occured while updateding"


@app.delete('/tasks/{id}')
def delete_task(id:int,db:Session = Depends(get_db)):
    db_tasks = db.query(database_models.Task).filter(id == database_models.Task.id).first()
    if db_tasks:
        db.delete(db_tasks)
        db.commit()
        return "Deleted"
    else:
        return f"No data found on id : {id}"