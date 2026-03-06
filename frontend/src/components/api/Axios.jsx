import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000'

const Axiosinstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});   


export default Axiosinstance