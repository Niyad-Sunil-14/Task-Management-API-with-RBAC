#Task Management api with role based access

from fastapi import FastAPI,Depends,Header
from database import session,engine
import database_models
from sqlalchemy.orm import Session
from models import Task,UserCreate,UserOut,UserLogin
import hashlib
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException,status
from sqlalchemy.exc import IntegrityError


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

database_models.Base.metadata.create_all(bind=engine)


def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()


#Task API
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
    db_task = db.query(database_models.Task).filter(database_models.Task.id == id).first()
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
    






#Register API
@app.post('/register',response_model=UserOut)
def create_user(data:UserCreate,db:Session =Depends(get_db)):
    if len(data.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Password should have at least 8 characters"
        ) 
    credentials = database_models.User(
        username = data.username,
        email = data.email,
        password = hashlib.sha256(data.password.encode("utf-8")).hexdigest()
    )
    try:
        db.add(credentials)
        db.commit()
        db.refresh(credentials)
        return credentials
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or Email already registered"
        )



#Login API
@app.post('/login')
def login_user(data:UserLogin,db:Session =Depends(get_db)):
    user = db.query(database_models.User).filter(data.username == database_models.User.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid Username or Password!")
    
    hashed_pwd = hashlib.sha256(data.password.encode("utf-8")).hexdigest()

    if user.password == hashed_pwd:
        return {
        "status": "success",
        "username": user.username,
        "message": "Login successful"
    }
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid Username or Password!")





def verify_user_status(x_user_name: str = Header(None)):
    if x_user_name is None:
        raise HTTPException(
            status_code=401, 
            detail="Authentication required. Please log in."
        )
    return x_user_name



@app.get('/getuser')
def get_user(db:Session = Depends(get_db),current_user : Session = Depends(verify_user_status)):
    user = db.query(database_models.User).filter(database_models.User.username == current_user).first()
    return user