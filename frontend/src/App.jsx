import { Route, Routes } from 'react-router'
import './App.css'
import Register from './components/account/Register'
import Login from './components/account/Login'
import Home from './components/tasks/Home'
import Create from './components/tasks/Create'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Register/>} path='register'/>
        <Route element={<Login/>} path='login'/>
        <Route element={<Create/>} path='create-task'/>
      </Routes>
    </>
  )
}

export default App
