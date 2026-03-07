import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NavBar from './NavBar';
import '../../App.css'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Axiosinstance from '../api/Axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';


const statusOptions = [
  { value: 'To Do', label: 'To Do' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'In Review', label: 'In Review' },
  { value: 'Completed', label: 'Completed' },
];

export default function Edit() {
    const MyId = useParams()    
    const navigate = useNavigate()
    const [success,setSuccess] = useState()
    const [error,setError] = useState()
    const [data,setData] = useState({
        title : "",
        description : "",
        status:"To Do"
    })
    

    const getData = () =>{
        Axiosinstance.get(`tasks/${MyId.id}`).then((res)=>{
            setData(res.data)
        })
    }

    const handleChange =(e) =>{
        const {name,value} = e.target
        setData({
            ...data,
            [name] : value
        })
    }

    const postData = () => {
        Axiosinstance.put(`tasks/${MyId.id}`,data).then((res)=>{
            console.log("Sucussfully updated data to backend",res.data);
            setSuccess("Successfully updated data")
            setTimeout(() => {
                navigate('/')
            }, 1500);
        })
        .catch((err)=>{
            setError("Fill all the field")
        })
    }

    const handleSumbit = (e) =>{
        e.preventDefault()
        postData()
    }
    
    useEffect(()=>{
        getData()
    },[])

  return (
    <>
    <NavBar/>
    <Box
        onSubmit={handleSumbit}
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, textAlign:"center"}}
        noValidate
        autoComplete="off"
    >
        <h1>Edit Task</h1>
        <div className='form'>
            <TextField
                id="outlined-password-input"
                label="Task"
                type="text"
                name='title'
                value={data.title}
                onChange={handleChange}
            />
            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                name='description'
                value={data.description}
                onChange={handleChange}
            />
            <TextField
                id="outlined-select-currency"
                select
                label="Select"
                helperText="Please select your current status"
                name='status'
                value={data.status || "todo"}
                onChange={handleChange}
                >
                {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
        <Button type='submit' variant="contained" sx={{marginTop:"20px"}}>Update</Button>
    </Box>
    {
        success?<p style={{color:"green",textAlign:"center"}}>{success}</p> :
        <p style={{color:"red",textAlign:"center"}}>{error? error:""}</p>    
    }
    </>
  );
}