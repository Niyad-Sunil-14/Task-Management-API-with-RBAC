import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000'

const Axiosinstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});   

Axiosinstance.interceptors.request.use((config) => {
  const username = localStorage.getItem("username"); // Get the LATEST value
  
  if (username) {
    config.headers["X-User-Name"] = username;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default Axiosinstance