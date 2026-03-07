import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';


export default function NavBar() {
    const navigate = useNavigate()

    const user = localStorage.getItem("username")
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    const handleLogout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("isLoggedIn")
        setTimeout(() => {
            navigate('/login')
        }, 1000);
    }
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ marginRight: isLoggedIn ? "25px": "0px" , flexGrow : isLoggedIn ? 0:1 }}>
            <Link to={'/'} style={{color:"white",textDecoration:"none"}}>Task Management App</Link>
          </Typography>
            {
                isLoggedIn?(
                    <>             
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to={'/create-task'} style={{color:"white",textDecoration:"none"}}>
                          Add Task<AddIcon sx={{ verticalAlign: "text-bottom" }}/>
                        </Link>
                      </Typography>
                      <li style={{marginRight:"10px"}}>Welcome {user}</li>
                      <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>                   
                ):(       
                    <Button color="inherit"><Link style={{textDecoration:"none",color:"white"}} to={'/login'}>Login</Link></Button>
                )
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
