import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from 'lucide-react';
import './Register.css';
import { Link, useNavigate } from 'react-router';
import Axiosinstance from '../api/Axios';

const Register = () => {
  const navigate = useNavigate()
  const [error,setError] = useState("")
  const [success,setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password } = formData;

  const onChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Registering...', formData);
    Axiosinstance.post('register',formData).then((res)=>{
      setSuccess(true)
      console.log("Registration Successfull.",res.data);
      setTimeout(()=>{
        navigate('/login')
      },2000)
    })
    .catch((err)=>{
      if (err.response.status === 422){
        setError(err.response?.data?.detail)
      }
      else if(err.response.status === 400){
        setError(err.response.data.detail)
      }
      else{
        setError("Something went wrong. Please try again.")
      }
    })
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="register-header">
          <div className="icon-circle">
            <UserPlus size={28} color="#fff" />
          </div>
          <h2>Create Account</h2>
          <p>Let's get you set up</p>
          {
            success?<p style={{color:"green"}}>Registration Successfully completed</p>: error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
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
            <Mail className="input-icon" size={18} />
            <input 
              type="email" name="email" placeholder="Email Address"
              value={email} onChange={onChange} required 
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
            Get Started
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to={'/login'}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;