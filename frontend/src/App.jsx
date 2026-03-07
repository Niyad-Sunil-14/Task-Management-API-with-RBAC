import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Register from './components/account/Register'
import Login from './components/account/Login'
import Home from './components/tasks/Home'
import Create from './components/tasks/Create'
import Edit from './components/tasks/Edit'

export const ProtectedRoutes = ({children}) =>{
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn){
    return <Navigate to={'/login'} replace/>
  }
  return children
}

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Register/>} path='register'/>
        <Route element={<Login/>} path='login'/>


        <Route element={
          <ProtectedRoutes>
            <Create/>
          </ProtectedRoutes>
          } 
          path='create-task'
        />

        <Route element={
          <ProtectedRoutes>
            <Edit/>
          </ProtectedRoutes>
          } 
          path="edit-task/:id"
        />
        </Routes>
    </>
  )
}

export default App
