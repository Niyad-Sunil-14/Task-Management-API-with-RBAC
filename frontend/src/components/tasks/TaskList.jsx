import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import Axiosinstance from '../api/Axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Divider, Chip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Navigate } from 'react-router';
import { ProtectedRoutes } from '../../App';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 0, 
  overflow: 'hidden'
};

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
        Axiosinstance.delete(`/tasks/${id}`).then((res)=>{
          window.location.reload()
        })
      };

      const [fetchData,setFetchData] =useState([])
      const handleOpen = (e) => {
        setOpen(true);
        e.stopPropagation()
        const id = params.id
        Axiosinstance.get(`tasks/${id}`).then((res)=>{
          console.log("Successfully fetched data",res.data);
          setFetchData(res.data)
        })
      }
      const [open, setOpen] = React.useState(false);
      const handleClose = () => setOpen(false); 

      const isLoggedIn = localStorage.getItem("isLoggedIn")

     return (
      <>
        <div style={{ display: 'flex', gap: '15px',justifyContent:"space-around" ,alignItems:"center"}}>
          <IconButton 
            color="primary" 
            size="small"
            onClick={handleOpen}
          >
          <VisibilityIcon fontSize="small" />
          </IconButton>


          {
            isLoggedIn?(
            <>
              <Link to={`edit-task/${params.id}`}>
                <IconButton
                  color="primary"
                  size="small"

                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Link>
              <IconButton 
                color="error" 
                size="small"
                onClick={onClickDelete}
              >
              <DeleteIcon fontSize="small" />
              </IconButton>
            </>
            )
            :""
          }
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            {/* HEADER */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f5f5f5' }}>
              <Typography variant="h6" fontWeight="bold">
                Task Details
              </Typography>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider />

            {/* BODY */}
            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">
                    TITLE
                  </Typography>
                  <Typography variant="body1">{fetchData.title}</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">
                    DESCRIPTION
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', mt: 0.5 }}>
                    {fetchData.description || "No description provided."}
                  </Typography>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                      CURRENT STATUS
                    </Typography>
                    <Chip 
                      label={fetchData.status?.toUpperCase().replace('_', ' ')} 
                      color={fetchData.status === 'completed' ? 'success' : 'primary'} 
                      size="small" 
                      sx={{ mt: 0.5, fontWeight: 'bold' }}
                    />
                  </Box>
                </Box>
              </Stack>
            </Box>

            {/* FOOTER (Optional) */}
            <Box sx={{ p: 2, textAlign: 'right', bgcolor: '#fafafa' }}>
              <Typography variant="caption" color="grey.500">
                Task ID: {fetchData.id}
              </Typography>
            </Box>
          </Box>
        </Modal>
      </>
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
    <>
      <Paper sx={{ height:"75vh",width: "80%",marginTop:"54px",justifySelf:"center"}}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          />
      </Paper>
    </>
  );
}
