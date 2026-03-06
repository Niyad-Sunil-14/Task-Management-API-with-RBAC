import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Axiosinstance from '../api/Axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

const columns = [
  { field: 'count', headerName: 'Index', width: 100 ,renderCell: (params) => {
      const rowIndex = params.api.getAllRowIds().indexOf(params.id);
      return rowIndex + 1;
    },},
  { field: 'title', headerName: 'Task', width: 200 },
  { field: 'description', headerName: 'Description', width: 310 },
  { field: 'status', headerName: 'Status', width: 200 },
  { field: 'actions', headerName: 'Actions', width: 200 ,
    renderCell:(params) =>{
      const onClickDelete = (e) => {
        e.stopPropagation(); // Prevents the row from being selected when clicking button
        const id = params.id;
        console.log("Delete ID:", id);
        // Axiosinstance.delete(`/users/${id}`)
      };


     return (
        <div style={{ display: 'flex', gap: '15px',justifyContent:"space-around" }}>
          <IconButton 
            color="primary" 
            size="small"
            onClick={() => console.log("View row:", params.id)}
          >
          <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            onClick={() => console.log("Edit row:", params.id)}
          >
          <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            color="error" 
            size="small"
            onClick={onClickDelete}
          >
          <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      );
    }
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TaskList() {
  const [data,setData] = useState([])

  const getData = ()=> Axiosinstance.get('tasks').then((res)=>{
    setData(res.data)
  })

  useEffect(()=>{
    getData()
  },[])

  return (
    <Paper sx={{ height:"75vh",width: "80%",marginTop:"54px",justifySelf:"center"}}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        />
    </Paper>
  );
}
