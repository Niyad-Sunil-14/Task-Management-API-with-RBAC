import React, { useState } from 'react';
import { Eye, EyeOff, Lock, LogIn, User } from 'lucide-react';
import './Login.css';
import { Link, useNavigate } from 'react-router';
import Axiosinstance from '../api/Axios';

const Login = () => {
  const navigate = useNavigate()
  const [success,setSuccess] = useState(false)
  const [error,setError] = useState("")
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { username, password } = formData;

  const onChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in...', { username, password });
    Axiosinstance.post('login',formData).then((res)=>{
      localStorage.setItem("isLoggedIn","true")
      localStorage.setItem("username",res.data.username)
      console.log("successfully logged in",res.status);
      window.location.href = "/";
      setSuccess(true)
      setTimeout(()=>{
        navigate('/')
      },2000)
    })
    .catch((err)=>{
      setError(err.response.data.detail || "Login Failed!") 
    })
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-circle">
            <LogIn size={28} color="#fff" />
          </div>
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
          { 
            success?<p style={{color:"green"}}>Login Successfully completed</p>: error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
          }
        </div>

        <form onSubmit={onSubmit} className="modern-form">
          <div className="input-group">
            <User className="input-icon" size={18} />
            <input 
              type="text" name="username" placeholder="Username"
              value={username} onChange={onChange} required 
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={18} />
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" placeholder="Password"
              value={password} onChange={onChange} required 
            />
            <button 
              type="button" 
              className="toggle-pw"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to={'/register'}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;