import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router';

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
            {
                isLoggedIn?(
                    <>             
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
